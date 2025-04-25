import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { KeenIcon } from "@/components";
const CompanyProfile = () => {
  const rows = [
    {
      icon: "dribbble",
      text: "https://scriptai.com",
      info: true,
    },
    {
      icon: "facebook",
      text: "ScriptAI",
      info: true,
    },
    {
      icon: "youtube",
      text: "ScriptAi-tuts",
      info: true,
    },
    {
      icon: "whatsapp",
      text: "+91-8724XXXXXX",
      info: false,
    },
    {
      icon: "map",
      text: "Central Delhi, India",
      info: false,
    },
  ];
  const products = [
    {
      label: "Create Script",
    },
  ];
  const renderRows = (row, index) => {
    return (
      <div key={index} className="flex items-center gap-2.5">
        <span>
          <KeenIcon icon={row.icon} className="text-lg text-gray-500" />
        </span>
        {row.info ? (
          <a href={row.text} className="link text-sm font-medium">
            {row.text}
          </a>
        ) : (
          <span className="text-sm text-gray-900">{row.text}</span>
        )}
      </div>
    );
  };
  const renderProducts = (product, index) => {
    return (
      <span key={index} className="badge badge-outline">
        {product.label}
      </span>
    );
  };
  const customIcon = L.divIcon({
    html: `<i class="ki-solid ki-geolocation text-3xl text-success"></i>`,
    className: "leaflet-marker",
    bgPos: [10, 10],
    iconAnchor: [20, 37],
    popupAnchor: [0, -37],
  });
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Company Profile</h3>
      </div>
      <div className="card-body">
        <h3 className="text-base font-semibold text-gray-900 leading-none mb-5">
          Headquarter
        </h3>

        <div className="flex flex-wrap items-center gap-5 mb-10">
          <MapContainer
            center={[28.652121, 77.208504]}
            zoom={30}
            className="rounded-xl w-full md:w-80 min-h-52"
          >
            <TileLayer
              attribution='&copy; <a href="https://google.com/maps/copyright">GoogleMaps</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[28.652121, 77.208504]} icon={customIcon}>
              <Popup>Central Delhi, Delhi, India-110001</Popup>
            </Marker>
          </MapContainer>

          <div className="flex flex-col gap-2.5">
            {rows.map((row, index) => {
              return renderRows(row, index);
            })}
          </div>
        </div>

        <div className="grid gap-2.5 mb-7">
          <div className="text-md font-semibold text-gray-900">About</div>
          <p className="text-sm text-gray-800 leading-5.5">
            Give your Story Telling a Boost with our product ScriptAi that lets
            you create starting scripts for you to build on.
          </p>
        </div>

        <div className="flex flex-col gap-4 mb-2.5">
          <div className="text-md font-semibold text-gray-900">Products</div>
          <div className="flex flex-wrap gap-2.5">
            {products.map((product, index) => {
              return renderProducts(product, index);
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export { CompanyProfile };
