# StyleGenie - AI Personal Stylist

StyleGenie is an AI-powered personal styling application that provides tailored outfit recommendations based on user photos, body type, and occasion preferences.

![StyleGenie Logo](logo.png)

## Table of Contents

* [Overview](#overview)
* [Features](#features)
* [Local Development](#local-development)
* [Deployment Options](#deployment-options)

  * [Docker Deployment](#docker-deployment)
  * [Kubernetes Deployment](#kubernetes-deployment)
  * [ArgoCD Deployment](#argocd-deployment)
* [CI/CD Pipeline](#cicd-pipeline)
* [Monitoring and Maintenance](#monitoring-and-maintenance)
* [Troubleshooting](#troubleshooting)
* [Contributing](#contributing)
* [License](#license)

## Overview

StyleGenie uses advanced AI to analyze user photos and preferences to create personalized outfit recommendations. The application is built with React, Vite, and Tailwind CSS, providing a responsive and modern user interface.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Features

* Photo upload for personalized styling
* Occasion-based outfit recommendations
* Body type analysis for tailored suggestions
* Historical fashion insights
* Shopping assistance with price range options

## Local Development

### Prerequisites

* Node.js (v16+)
* npm (v7+)
* Git

### Setup

Clone the repository:

```bash
git clone https://github.com/crackcrickcrack/stylegenie-wardrobe-alchemy.git
cd stylegenie-wardrobe-alchemy
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Access the app at [http://localhost:5173](http://localhost:5173)

## Deployment Options

### Docker Deployment

#### Prerequisites

* Docker (v20+)
* Docker Compose (optional)

#### Build and Run

```bash
docker build -t stylegenie:latest .
docker run -p 8080:80 stylegenie:latest
```

Access at [http://localhost:8080](http://localhost:8080)

#### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3'
services:
  stylegenie:
    build: .
    ports:
      - "8080:80"
    restart: unless-stopped
```

Run:

```bash
docker-compose up -d
```

### Kubernetes Deployment

#### Prerequisites

* Kubernetes cluster (e.g., minikube)
* kubectl
* Helm (optional)

#### Deployment Steps

```bash
minikube start
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/
kubectl get all -n stylegenie
```

Access the app:

```bash
minikube service stylegenie -n stylegenie --url
```

#### Scaling

```bash
kubectl scale deployment stylegenie -n stylegenie --replicas=3
```

### ArgoCD Deployment

#### Prerequisites

* ArgoCD installed in Kubernetes
* Application Git repo with manifests

#### Setup ArgoCD

```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
kubectl port-forward svc/argocd-server -n argocd 8080:443
```

Access [https://localhost:8080](https://localhost:8080)

Default credentials:

* Username: `admin`
* Password:

```bash
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
```

#### Create Application

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: stylegenie
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/your-username/stylegenie-k8s-manifests.git
    targetRevision: HEAD
    path: k8s
  destination:
    server: https://kubernetes.default.svc
    namespace: stylegenie
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

Verify:

```bash
kubectl get applications -n argocd
```

## CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/ci-cd.yml`:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Run tests
      run: npm test

    - name: Build
      run: npm run build

    - name: Build and push Docker image
      uses: docker/build-push-action@v4
      with:
        context: .
        push: ${{ github.event_name != 'pull_request' }}
        tags: |
          ghcr.io/${{ github.repository }}:latest
          ghcr.io/${{ github.repository }}:${{ github.sha }}
      env:
        DOCKER_USERNAME: ${{ github.actor }}
        DOCKER_PASSWORD: ${{ secrets.GITHUB_TOKEN }}

    - name: Update Kubernetes manifests
      if: github.event_name != 'pull_request'
      run: |
        sed -i "s|image: ghcr.io/.*|image: ghcr.io/${{ github.repository }}:${{ github.sha }}|g" k8s/deployment.yaml
        git config --global user.name "GitHub Actions"
        git config --global user.email "actions@github.com"
        git add k8s/deployment.yaml
        git commit -m "Update image tag to ${{ github.sha }}" || echo "No changes to commit"
        git push
```

## Monitoring and Maintenance

### Prometheus and Grafana

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm install prometheus prometheus-community/kube-prometheus-stack --namespace monitoring --create-namespace
kubectl port-forward svc/prometheus-grafana -n monitoring 3000:80
```

Access [http://localhost:3000](http://localhost:3000)

Default credentials:

* Username: `admin`
* Password: `prom-operator`

### Logging with EFK

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/kubernetes/master/cluster/addons/fluentd-elasticsearch/fluentd-es-configmap.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes/kubernetes/master/cluster/addons/fluentd-elasticsearch/fluentd-es-ds.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes/kubernetes/master/cluster/addons/fluentd-elasticsearch/es-service.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes/kubernetes/master/cluster/addons/fluentd-elasticsearch/es-statefulset.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes/kubernetes/master/cluster/addons/fluentd-elasticsearch/kibana-deployment.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes/kubernetes/master/cluster/addons/fluentd-elasticsearch/kibana-service.yaml
kubectl port-forward svc/kibana-logging -n kube-system 5601:5601
```

Access [http://localhost:5601](http://localhost:5601)

## Troubleshooting

### Pod is not starting

```bash
kubectl get pods -n stylegenie
kubectl describe pod <pod-name> -n stylegenie
kubectl logs <pod-name> -n stylegenie
```

### Service is not accessible

```bash
kubectl get svc -n stylegenie
kubectl describe svc stylegenie -n stylegenie
```

### Image pull errors

```bash
kubectl describe pod <pod-name> -n stylegenie | grep -A10 Events
```

### ArgoCD sync issues

```bash
kubectl get applications -n argocd
kubectl describe application stylegenie -n argocd
```

## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

For more information or support, contact the StyleGenie team at [support@stylegenie.example.com](mailto:support@stylegenie.example.com).

