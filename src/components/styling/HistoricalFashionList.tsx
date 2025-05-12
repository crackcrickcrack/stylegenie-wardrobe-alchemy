
import { HistoricalFashionItem } from "./types";

type HistoricalFashionListProps = {
  items: HistoricalFashionItem[];
};

const HistoricalFashionList = ({ items }: HistoricalFashionListProps) => {
  if (items.length === 0) return null;

  return (
    <div className="space-y-4">
      <h4 className="text-xl font-medium">Historical Fashion Journey</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <div key={index} className="border border-gray-200 p-4 rounded-md">
            {item.image_url ? (
              <img 
                src={item.image_url} 
                alt={`Fashion from ${item.year}`} 
                className="w-full h-32 object-cover rounded-md mb-2"
              />
            ) : (
              <div className="w-full h-32 bg-gray-200 rounded-md mb-2 flex items-center justify-center">
                <p className="text-gray-500">No image available</p>
              </div>
            )}
            <p className="text-center font-medium">Year: {item.year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoricalFashionList;
