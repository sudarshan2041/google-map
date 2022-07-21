import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import {
  Wrapper,
  InFoBax,
  FlexBox,
  Header,
  mapStyles,
  BoxWrapper,
  ParentContainer,
} from "./style";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
function ComponentOneView({
  data,
  loader,
  bankDataArr,
  selectedBank,
  setSelectedBank,

  currentPosition,
  onMarkerDragEnd,
  tabValue,
  handleTabChange,
  // handleRemove,
}) {
  console.log(selectedBank);
  function handleRemove(e) {
    e.preventDefault();
    let updatedArr = selectedBank.filter((ele) => ele.isSelected === true);
    updatedArr.map((ele) => {
      if (ele.placeId == e.target.id) {
        ele.isSelected = false;
      }
    });

    setSelectedBank(updatedArr);
  }

  return (
    <Wrapper>
      <ParentContainer>
        <Stack
          // spacing={6}
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Button variant="contained" id="Tab1" onClick={handleTabChange}>
            Tab 1
          </Button>
          <Button variant="outlined" id="Tab2" onClick={handleTabChange}>
            Tab 2
          </Button>
        </Stack>

        <div style={{ padding: "10px" }}>
          <div style={{ color: "gray" }}>Current Address : </div>
          {data?.results[0].formatted_address}
        </div>
        <LoadScript
          style={mapStyles}
          googleMapsApiKey="AIzaSyC68H9SdF9KiJWStgwPugHIgY_IILwefRo"
        >
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={11}
            center={currentPosition}
          >
            {!loader && (
              <Marker
                position={currentPosition}
                showMyLocationButton={true}
                onDragEnd={(e) => onMarkerDragEnd(e)}
                draggable={true}
              />
            )}
            {bankDataArr.length > 0 &&
              bankDataArr.map((ele) => {
                return (
                  <Marker
                    position={ele?.location?.location}
                    showMyLocationButton={true}
                    icon={
                      "https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png"
                    }
                  />
                );
              })}
          </GoogleMap>
        </LoadScript>

        {tabValue === "Tab1" && (
          <>
            <Header>Near By Branch</Header>
            <BoxWrapper>
              {bankDataArr.length > 0 &&
                bankDataArr.map((ele) => {
                  return (
                    <InFoBax key={ele.placeId}>
                      <FlexBox>
                        <div style={{ fontSize: "16px" }}>{ele.name}</div>
                        <div>{ele.checkBox}</div>
                      </FlexBox>
                      <div style={{ fontSize: "15px" }}>{ele.address}</div>
                    </InFoBax>
                  );
                })}
            </BoxWrapper>
          </>
        )}

        {tabValue === "Tab2" && (
          <>
            <Header>Branch Visiting</Header>
            {selectedBank.length > 0 ? (
              <BoxWrapper>
                {selectedBank
                  .filter((ele) => ele.isSelected === true)
                  .map((ele) => {
                    console.log(ele.placeId);
                    return (
                      <InFoBax key={ele.placeId}>
                        <FlexBox>
                          <div style={{ fontSize: "16px" }}>{ele.name}</div>
                          <div id={ele.placeId}>
                            <CloseIcon
                              id={ele.placeId}
                              style={{ cursor: "pointer" }}
                              onClick={(e) => {
                                handleRemove(e);
                              }}
                            />
                          </div>
                        </FlexBox>
                        <div style={{ fontSize: "15px" }}>{ele.address}</div>
                      </InFoBax>
                    );
                  })}
              </BoxWrapper>
            ) : (
              <Header>No Data</Header>
            )}
          </>
        )}
      </ParentContainer>
    </Wrapper>
  );
}

export default ComponentOneView;
