"use client";
import { IRoom } from "@/backend/models/room";
import React, { useState, useEffect } from "react";
import StarRatings from "react-star-ratings";
import RoomImageSlider from "./RoomImageSlider";
import RoomFeatures from "./RoomFeatures";
import BookingDatePicker from "./BookingDatePicker";
import ListReview from "../review/ListReview";
import NewReview from "../review/NewReview";
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
import "mapbox-gl/dist/mapbox-gl.css";
import { Collapse } from "react-bootstrap";
import FAQ from "./FAQ";

interface Props {
  data: {
    room: IRoom;
  };
}

mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN;

const RoomDetails = ({ data }: Props) => {
  const [activeSection, setActiveSection] = useState<string | null>(
    "description"
  );

  const { room } = data;
  useEffect(() => {
    const setMap = async () => {
      const coordinates = room?.location?.coordinates;

      const map = new mapboxgl.Map({
        container: "room-map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: coordinates,
        room: 12,
      });

      const mapCanvas = map.getCanvas();
      if (mapCanvas) {
        mapCanvas.style.width = "100%";
        mapCanvas.style.height = "100%";
      }

      // add marker to the map
      new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
    };
    if (room?.location) setMap();
  }, []);

  const handleSectionClick = (sectionId: string) => {
    setActiveSection((prevSection) =>
      prevSection === sectionId ? null : sectionId
    );
  };

  return (
    <div className="container container-fluid">
      <h2 className="mt-5">{room?.name}</h2>
      <p>{room?.address}</p>

      <div className="ratings mt-auto mb-3">
        <StarRatings
          rating={room?.ratings}
          starRatedColor="#5C1ED7"
          numberOfStars={5}
          starDimension="22px"
          starSpacing="1px"
          name="rating"
        />
        <span className="no-of-reviews">({room?.numOfReviews} Reviews)</span>
      </div>

      <RoomImageSlider images={room?.images} />

      <div className="d-flex mx-4 overflow-x-auto overflow-y-hidden justify-content-center flex-nowrap text-light mt-3">
        <a
          onClick={() => handleSectionClick("description")}
          className={`d-flex align-items-center flex-shrink-0 px-5 py-3 sec-header  ${
            activeSection === "description"
              ? "text-muted rounded-top border border-bottom-0"
              : "text-muted border-bottom"
          }`}
        >
          <span className="me-2">Description</span>
        </a>

        <a
          onClick={() => handleSectionClick("room-location")}
          className={`d-flex align-items-center flex-shrink-0 px-5 py-3 border-bottom sec-header ${
            activeSection === "room-location"
              ? "text-muted rounded-top border border-bottom-0"
              : "text-muted border-bottom"
          }`}
        >
          <span className="me-2">Room Location</span>
        </a>
        <a
          onClick={() => handleSectionClick("faq")}
          className={`d-flex align-items-center flex-shrink-0 px-5 py-3 border-bottom sec-header ${
            activeSection === "faq"
              ? "text-muted rounded-top border border-bottom-0"
              : "text-muted border-bottom"
          }`}
        >
          <span className="me-2">FAQ</span>
        </a>
      </div>

      <div className="row my-5">
        <Collapse in={activeSection === "description"}>
          <div className="col-12 col-md-6 col-lg-8">
            <h3 className="block text-gray-800 text-3xl font-semibold">
              Description
            </h3>
            <p>{room.description}</p>
            <RoomFeatures room={room} />
          </div>
        </Collapse>

        <Collapse in={activeSection === "room-location"}>
          <div className="col-12 col-md-6 col-lg-8">
            {room?.location && (
              <div>
                <h3 className=" block text-gray-800 text-3xl font-semibold my2">
                  Location
                </h3>
                <div
                  id="room-map"
                  className="shadow rounded"
                  style={{ height: 350, width: "100%" }}
                ></div>
              </div>
            )}
          </div>
        </Collapse>

        <Collapse in={activeSection === "faq"}>
          <div className="col-12 col-md-6 col-lg-8">
            <FAQ />
          </div>
        </Collapse>

        <div className="col-12 col-md-6 col-lg-4">
          <BookingDatePicker room={room} />
        </div>
      </div>
      <NewReview roomId={room?._id} />
      <ListReview reviews={room?.reviews} />
    </div>
  );
};

export default RoomDetails;
