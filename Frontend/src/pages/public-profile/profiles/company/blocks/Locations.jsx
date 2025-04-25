import { KeenIcon } from "@/components";
import { CardLocation } from "@/partials/cards";
const Locations = () => {
  const items = [
    {
      image: "/media/app/central-delhi.png",
      title: "ScriptAI Tech Hub",
      description: "Central Delhi, India",
    },
  ];
  const renderItem = (item, index) => {
    return (
      <CardLocation
        key={index}
        image={item.image}
        title={item.title}
        description={item.description}
      />
    );
  };
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Locations</h3>
      </div>
      <div className="card-body p-5 lg:p-7.5 lg:pb-7">
        <div className="flex gap-5 scrollable-x">
          {items.map((item, index) => {
            return renderItem(item, index);
          })}
        </div>
      </div>
    </div>
  );
};
export { Locations };
