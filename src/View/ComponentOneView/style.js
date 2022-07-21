import { Box, styled } from "@mui/material";

export const mapStyles = {
  height: "200px",
  width: "395px",
};

export const Header = styled(Box)({
  fontSize: "20px",
  margin: "10px 0 10px 90px",
  width: "100%",
});
export const Wrapper = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});
export const ParentContainer = styled(Box)({
  width: "400px",
  height: "100%",
  border: "1px solid black",
  margin: "10px auto",
  paddingTop: "10px",
  borderRadius: "10px",
});
export const InFoBax = styled(Box)({
  border: "1px solid gray",
  borderRadius: "10px",
  margin: "5px",
  padding: "5px",
});
export const FlexBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});
export const BoxWrapper = styled(Box)({
  height: "408px",
  overflowX: "auto",
});
