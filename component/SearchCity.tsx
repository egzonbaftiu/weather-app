import React from "react";
import styled from "styled-components/native";

const SearchCityCast = ({ toggleSearch, city, setCity, fetchCity }: any) => {
  const handleSubmit = () => {
    if (toggleSearch === "city") {
      fetchCity();
    }
  };

  return (
    <Container>
      <SearchBy>
        <Buttons
          title="City"
          color={"white"}
          accessibilityLabel="Search Weather By City"
        />
      </SearchBy>

      <SearchCity
        onChangeText={setCity}
        value={city}
        placeholder={"Search By City"}
        onSubmitEditing={handleSubmit}
      />
    </Container>
  );
};

export default SearchCityCast;

const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 35px;
`;

const Buttons = styled.Button`
  color: black;
  background-color: gray;
`;

const SearchBy = styled.View`
  display: flex;
  flex-direction: row;
  color: white;
  margin-top: 20px;
  align-items: center;
  justify-content: flex-start;
  width: 95%;
  max-width: 700px;
`;

const ButtonLabel = styled.Text`
  color: white;
  margin-right: 10px;
`;

const SearchCity = styled.TextInput`
  height: 50px;
  margin: 12px;
  background-color: white;
  padding: 15px;
  border-radius: 10px;
  width: 95%;
  max-width: 700px;
`;
