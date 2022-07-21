import React, { useEffect, useState } from "react";
import ComponentOneView from "../../View/ComponentOneView";
import { useDispatch, useSelector } from "react-redux";
import { cordinatesData } from "../../redux/actions/cordinatesAction";
import { nearByAction } from "../../redux/actions/nearByAction";

function ComponentOneContainer() {
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector((state) => state.latlngReducer);
  const { nearByisLoading, nearByBanks } = useSelector(
    (state) => state.nearByReducer
  );

  const [currentPosition, setCurrentPosition] = useState({});
  const [loader, setLoader] = useState(false);
  const [bankDataArr, setBankDataArr] = useState([]);
  const [tabValue, setTabValue] = useState("Tab1");

  useEffect(() => {
    if (nearByBanks) {
      formatBankArr(nearByBanks);
    }
  }, [nearByBanks]);

  // FOLLOWING FUNCTION USED FOR GET THE DATA FROM API/ARRAY and MODIFE AS WE WANT
  function formatBankArr(data) {
    let arr = data.results.map((ele, index) => {
      return createData(
        ele.name,
        ele.geometry,
        ele.formatted_address,
        ele.place_id,
        index
      );
    });

    let filterdData = arr.filter((obj) => obj.name === "HDFC Bank");

    setBankDataArr(filterdData);
  }
  function createData(name, location, address, placeId, index) {
    let checkBox = (
      <>
        <input type="checkbox" value={placeId} onClick={visitBank} />
      </>
    );

    return {
      name,
      location,
      address,
      placeId,
      index,
      checkBox,
      isSelected: false,
    };
  }
  const [selectedBank, setSelectedBank] = useState([]);

  function visitBank(e) {
    let visitBankArr = [...bankDataArr];

    visitBankArr.map((ele) => {
      if (ele.placeId == e.target.value) {
        ele.isSelected = true;
      }
    });
    setSelectedBank(visitBankArr);
  }

  useEffect(() => {
    // get location from lat&lng
    dispatch(
      cordinatesData({ lat: currentPosition.lat, lng: currentPosition.lng })
    );
    // all bank name from lat&lng

    dispatch(
      nearByAction({ lat: currentPosition.lat, lng: currentPosition.lng })
    );
  }, [currentPosition]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  useEffect(() => {
    if (currentPosition.lat && currentPosition.lng) {
      setCurrentPosition(currentPosition);
      setLoader(false);
    } else {
      setLoader(true);
    }
  });

  const success = (position) => {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setCurrentPosition(currentPosition);
  };

  const onMarkerDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCurrentPosition({ lat, lng });
  };

  function handleTabChange(e) {
    console.log(e.target.id);
    setTabValue(e.target.id);
  }

  const props = {
    currentPosition,
    loader,
    data,
    bankDataArr,
    selectedBank,
    setSelectedBank,
    onMarkerDragEnd,
    tabValue,
    setTabValue,
    handleTabChange,
  };
  return (
    <div style={{ display: "flex" }}>
      <div>
        <div>1.Folder Structure like Container and View</div>
        <div>To avoid the complexity & bug </div>
        <div>used this folder structure </div>
        <div>2.Container - Written all login inside container </div>
        <div>3.View - All HTML render inside this component</div>
        <div>4.Red Marker is your current location</div>
        <div>5.P icon Indicatess HDFC bank near by location</div>
      </div>
      <ComponentOneView {...props} />
    </div>
  );
}

export default ComponentOneContainer;
