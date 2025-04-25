import clsx from "clsx";
const Tags = ({ title, className }) => {
  const items = [
    {
      label: "AI",
    },
    {
      label: "Generative-AI",
    },
    {
      label: "Script",
    },
    {
      label: "Creative StoryTelling",
    },
  ];
  const renderItem = (item, index) => {
    return (
      <span key={index} className="badge badge-sm badge-gray-200">
        {item.label}
      </span>
    );
  };
  return (
    <div className={clsx("card", className && className)}>
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
      </div>

      <div className="card-body">
        <div className="flex flex-wrap gap-2.5 mb-2">
          {items.map((item, index) => {
            return renderItem(item, index);
          })}
        </div>
      </div>
    </div>
  );
};
export { Tags };
