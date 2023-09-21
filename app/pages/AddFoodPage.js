import { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Pressable,
  Keyboard,
  Text,
  StyleSheet,
  Alert,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import { useTheme } from "react-native-paper";
import { BarCodeScanner } from "expo-barcode-scanner";
import NetInfo from "@react-native-community/netinfo";
import { A } from "@expo/html-elements";

import AppBar from "../components/AppBar";
import Database from "../classes/DatabaseClass";
import Button from "../components/Button";
import CornerActionButton from "../components/CornerActionButton";
import FoodAmountSelector from "../components/FoodAmountSelector";

function AddFoodPage(props) {
  const theme = useTheme();
  const db = new Database();
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const [scanning, setScanning] = useState(false);
  const [currentFoodIndex, setCurrentFoodIndex] = useState(0);
  const [scannedFoods, setScannedFoods] = useState([]);
  const [foodAmount, setFoodAmount] = useState([]);
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fats, setfats] = useState("");
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [finishedScanning, setFinishedScanning] = useState(false);
  const [shouldReScan, setShouldReScan] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    getBarCodeScannerPermissions();
  }, []);

  const validateMacro = (macro) => {
    let stringMacro = String(macro);

    if (macro == null) {
      return "0";
    }

    if (stringMacro.length == 0) {
      return "0";
    } else {
      return stringMacro;
    }
  };

  const onSubmitManualInput = () => {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    statement =
      "INSERT INTO meals (day, month, year, calories, protein, carbs, fats, date) VALUES(" +
      day +
      ", " +
      month +
      ", " +
      year +
      ", " +
      validateMacro(calories) +
      ", " +
      validateMacro(protein) +
      ", " +
      validateMacro(carbs) +
      ", " +
      validateMacro(fats) +
      ", '" +
      date +
      "')";

    db.sql(statement, () => {});
    props.navigation.pop();
  };

  const onSubmitQRInput = () => {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    for (let index = 0; index < scannedFoods.length; index++) {
      let food = scannedFoods[index];
      let amount = foodAmount[index];

      if (amount == null || String(amount).length == 0) {
        amount = 0;
      }

      let calories = food.calories * (amount / 100);
      let protein = food.protein * (amount / 100);
      let carbs = food.carbs * (amount / 100);
      let fats = food.fats * (amount / 100);

      statement =
        "INSERT INTO meals (day, month, year, calories, protein, carbs, fats, date) VALUES(" +
        day +
        ", " +
        month +
        ", " +
        year +
        ", " +
        validateMacro(calories) +
        ", " +
        validateMacro(protein) +
        ", " +
        validateMacro(carbs) +
        ", " +
        validateMacro(fats) +
        ", '" +
        date +
        "')";

      db.sql(statement, () => {});
    }
    props.navigation.pop();
  };

  const getBarCodeScannerPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const handleBarCodeScanned = ({ data }) => {
    if (shouldReScan) {
      let url =
        "https://world.openfoodfacts.org/api/v0/product/" + data + ".json";

      NetInfo.fetch().then((state) => {
        if (state.isConnected) {
          try {
            fetch(url, {
              method: "GET",
              headers: {
                Accept: "application/json",
              },
            })
              .then((response) => response.json())
              .then((response) => {
                let data;

                if (response.status == 0) {
                  data = {
                    name: "No name found",
                    image: null,
                    calories: null,
                    protein: null,
                    carbs: null,
                    fats: null,
                  };
                } else {
                  data = {
                    name: response.product.generic_name
                      ? response.product.generic_name
                      : "No name found",
                    image: response.product.image_url
                      ? response.product.image_url
                      : null,
                    calories: response.product.nutriments["energy-kcal_100g"]
                      ? response.product.nutriments["energy-kcal_100g"]
                      : null,
                    protein: response.product.nutriments.proteins_100g
                      ? response.product.nutriments.proteins_100g
                      : null,
                    carbs: response.product.nutriments.carbohydrates_100g
                      ? response.product.nutriments.carbohydrates_100g
                      : null,
                    fats: response.product.nutriments.fat_100g
                      ? response.product.nutriments.fat_100g
                      : null,
                  };
                }
                setData(data);
                setScanned(true);
                handleScannedFoods(data);
              });
          } catch (error) {
            console.error(error);
            Alert.alert("An error occured, please try again");
          }
        } else {
          let data = {
            name: "No name found",
            image: null,
            calories: null,
            protein: null,
            carbs: null,
            fats: null,
          };
          setData(data);
          setScanning(false);
          setScanned(false);
          Alert.alert(
            "An error occured connecting to the internet, please try again"
          );
        }
      });
      setShouldReScan(false);
    }
  };

  const handleScannedFoods = (data) => {
    let tempScannedFoods = [...scannedFoods];
    tempScannedFoods.push(null);

    tempScannedFoods[currentFoodIndex] = data;
    let tempFoodAmount = new Array(tempScannedFoods.length).fill(null);
    setScannedFoods(tempScannedFoods);
    setFoodAmount(tempFoodAmount);
  };

  const RenderFoodAmountSelection = () => {
    return scannedFoods.map((food, index) => {
      return (
        <FoodAmountSelector
          key={index}
          food={food}
          index={index}
          foodAmount={foodAmount}
          setFoodAmount={setFoodAmount}
        />
      );
    });
  };

  if (hasPermission === null && scanning) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
          justifyContent: "center",
        }}
      >
        <AppBar navigation={props.navigation} back title="Add meal" />
        <Text
          style={{
            color: theme.colors.onBackground,
            alignSelf: "center",
            textAlign: "center",
            padding: 50,
          }}
        >
          Requesting for camera permission
        </Text>
      </View>
    );
  }

  if (hasPermission === false && scanning) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
          justifyContent: "center",
        }}
      >
        <AppBar navigation={props.navigation} back title="Add meal" />
        <Text
          style={{
            color: theme.colors.onBackground,
            alignSelf: "center",
            textAlign: "center",
            padding: 50,
          }}
        >
          No access to camera
        </Text>
      </View>
    );
  }

  if (finishedScanning) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
        }}
      >
        <AppBar navigation={props.navigation} back title="Add meal" />
        <Text
          style={{
            color: theme.colors.onBackground,
            alignSelf: "center",
            textAlign: "center",
            padding: 10,
            fontSize: 20,
          }}
        >
          How much did you eat?
        </Text>
        <ScrollView>{RenderFoodAmountSelection()}</ScrollView>
        <Button
          title="Done"
          onPress={() => {
            onSubmitQRInput();
          }}
        />
        <View style={{ height: 50 }} />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <CornerActionButton
        icon={scanning ? "keyboard" : "qrcode"}
        onPress={() => {
          // Toggle between scanning and not
          setScanning(!scanning);
        }}
      />

      <AppBar navigation={props.navigation} back title="Add meal" />
      {scanning ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          {scanned ? (
            <View style={{ paddingTop: 20, alignItems: "center" }}>
              <Text style={styles.infoText}>name: {data.name}</Text>
              <Text style={styles.infoText}>
                calories Per 100g: {data.calories}
              </Text>
              <Text style={styles.infoText}>
                protein Per 100g: {data.protein}
              </Text>
              <Text style={styles.infoText}>carbs Per 100g: {data.carbs}</Text>
              <Text style={styles.infoText}>fats Per 100g: {data.fats}</Text>

              {data.image ? (
                <Image
                  style={[
                    styles.productImage,
                    { width: screenWidth * 0.8, height: screenWidth * 0.9 },
                  ]}
                  source={{ uri: data.image }}
                />
              ) : (
                <Image
                  style={[
                    styles.productImage,
                    { width: screenWidth * 0.8, height: screenWidth * 0.9 },
                  ]}
                  source={require("../../assets/no-food-image-found.png")}
                />
              )}

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Button
                  title="Scan again"
                  onPress={() => {
                    setScanned(false);
                    setShouldReScan(true);
                  }}
                />
                <Button
                  title="Scan another"
                  onPress={() => {
                    setScanned(false);
                    setShouldReScan(true);
                    setCurrentFoodIndex(currentFoodIndex + 1);
                  }}
                />
                <Button
                  title="Done"
                  onPress={() => {
                    setFinishedScanning(true);
                  }}
                />
              </View>
            </View>
          ) : (
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={{
                width: screenWidth,
                height: screenHeight * 0.9,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  width: screenWidth * 0.8,
                  height: screenWidth * 0.8,
                  tintColor: theme.colors.tertiary,
                }}
                source={require("../../assets/scanning-image.png")}
              />
              <A
                style={{
                  color: theme.colors.onBackground,
                  padding: 10,
                }}
                href="https://openfoodfacts.org"
              >
                Powered by Open Food Facts
              </A>
            </BarCodeScanner>
          )}
        </View>
      ) : (
        <Pressable
          style={{
            flex: 1,
          }}
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextInput
              style={[styles.textInput, { color: theme.colors.onBackground }]}
              placeholder="Calories"
              value={calories}
              keyboardType="numeric"
              onChangeText={setCalories}
            />

            <TextInput
              style={[styles.textInput, { color: theme.colors.onBackground }]}
              placeholder="Protein (g)"
              value={protein}
              keyboardType="numeric"
              onChangeText={setProtein}
            />

            <TextInput
              style={[styles.textInput, { color: theme.colors.onBackground }]}
              placeholder="Carobydrates (g)"
              value={carbs}
              keyboardType="numeric"
              onChangeText={setCarbs}
            />

            <TextInput
              style={[styles.textInput, { color: theme.colors.onBackground }]}
              placeholder="Fats (g)"
              value={fats}
              keyboardType="numeric"
              onChangeText={setfats}
            />
          </View>
          <Button title="Submit" onPress={onSubmitManualInput} />
        </Pressable>
      )}
    </View>
  );
}

export default AddFoodPage;

const styles = StyleSheet.create({
  textInput: {
    padding: 10,
    fontSize: 30,
  },
  infoText: {
    color: "white",
    padding: 10,
  },
  productImage: {
    borderRadius: 20,
  },
});
