import React, { useState } from "react";
import styles from "./detail.module.scss";
import { properties, cities } from "data";
import AwesomeSlider from "react-awesome-slider";
import { Map, Marker, TileLayer } from "react-leaflet";
import ClipboardJS from "clipboard";
import Check from "components/ui/icons/check";
import copy from "images/copy.png";
import { myIcon } from "utils/map";
import Title from "components/ui/title";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/custom-animations/cube-animation.css";
import "leaflet/dist/leaflet.css";

interface IDetailProps {
  id: number;
}

const Detail: React.FC<IDetailProps> = ({ id }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const clipboard = new ClipboardJS(`.${styles.copy}`);

  clipboard.on("success", function (e) {
    if (!showSuccess) {
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 3100);
    }
  });

  const property = properties.filter(
    (prop) => Number(prop.id) === Number(id)
  )[0];

  const position = { lat: property.lat, lng: property.lng };
  if (!scrolled) {
    setTimeout(() => {
      window.scrollTo(0, 0);
      setScrolled(true);
    }, 1000);
  }

  return (
    <div className={styles.container}>
      {showSuccess && <div className={styles.success}>Copied to clipboard</div>}
      <div className={styles.content}>
        <div className={styles.carousel}>
          <AwesomeSlider animation="cubeAnimation">
            {property.images.map((img, idx) => (
              <div key={idx} data-src={img} />
            ))}
          </AwesomeSlider>
        </div>
        <div className={styles.grid}>
          <div>
            <Title
              className={styles.title}
              text={`${property.type === "AP" ? "Apartment" : "House"} in ${
                cities.filter((city) => city.value === property.city)[0].label
              }`}
            />
            <p className={styles.text}>{property.description}</p>
            <div className={styles.dataContainer}>
              <div className={styles.data}>
                {property.buyPrice > 0 && (
                  <div className={styles.item}>
                    <h2 className={styles.trait}>Sell Price:</h2>
                    <p className={styles.trait}>{`$${property.buyPrice}`}</p>
                  </div>
                )}
                {property.rentPrice > 0 && (
                  <div className={styles.item}>
                    <h2 className={styles.trait}>Rent Price:</h2>
                    <p className={styles.trait}>{`$${property.rentPrice}`}</p>
                  </div>
                )}
                {property.adminFee > 0 && (
                  <div className={styles.item}>
                    <h2 className={styles.trait}>Admin Fee:</h2>
                    <p className={styles.trait}>{`$${property.adminFee}`}</p>
                  </div>
                )}
                <div className={styles.item}>
                  <h2 className={styles.trait}>Area:</h2>
                  <p className={styles.trait}>{`${property.area} m2`}</p>
                </div>
                <div className={styles.item}>
                  <h2 className={styles.trait}>Rooms:</h2>
                  <p className={styles.trait}>{`${property.rooms}`}</p>
                </div>
                <div className={styles.item}>
                  <h2 className={styles.trait}>Bathrooms:</h2>
                  <p className={styles.trait}>{`${property.bathrooms}`}</p>
                </div>
                <div className={styles.item}>
                  <h2 className={styles.trait}>Parking:</h2>
                  <p className={styles.trait}>{`${
                    property.parking ? "Yes" : "No"
                  }`}</p>
                </div>
              </div>
            </div>
            <Title className={styles.subtitle} text={"Features"} />
            <div className={styles.features}>
              {property.features.map((feat, idx) => {
                return (
                  <div className={styles.item} key={`F${idx}`}>
                    <Check />
                    <p className={styles.text}>{feat}</p>
                  </div>
                );
              })}
            </div>
            <Title className={styles.subtitle} text={"Map"} />
            <Map className={styles.map} center={position} zoom={13}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={position} icon={myIcon} />
            </Map>
          </div>
          <div className={styles.contact}>
            <Title className={styles.subtitle} text={"Contact"} />
            <div className={styles.flex}>
              <p className={styles.text}>{property.contactNumber}</p>
              <img
                className={styles.copy}
                title="Copy to clipboard"
                src={copy}
                width={16}
                height={16}
                alt="copy"
                data-clipboard-text={property.contactNumber}
              />
            </div>
            <div className={styles.flex}>
              <p className={styles.text}>{property.email}</p>
              <img
                className={styles.copy}
                title="Copy to clipboard"
                src={copy}
                width={16}
                height={16}
                alt="copy"
                data-clipboard-text={property.email}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
