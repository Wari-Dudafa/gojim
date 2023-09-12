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
} from "react-native";
import { useTheme } from "react-native-paper";
import { BarCodeScanner } from "expo-barcode-scanner";
import NetInfo from "@react-native-community/netinfo";

import AppBar from "../components/AppBar";
import Database from "../classes/DatabaseClass";
import Button from "../components/Button";
import CornerActionButton from "../components/CornerActionButton";

function AddFoodPage(props) {
  const theme = useTheme();
  const db = new Database();
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const [scanning, setScanning] = useState(false);
  const [currentFoodInex, setCurrentFoodIndex] = useState(0);
  const [scannedFoods, setScannedFoods] = useState([]);
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fats, setfats] = useState("");
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [shouldReScan, setShouldReScan] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    getBarCodeScannerPermissions();
  }, []);

  const onSubmit = () => {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    const validateMacro = (macro) => {
      let stringMacro = String(macro);

      if (stringMacro.length == 0) {
        return "0";
      } else {
        return stringMacro;
      }
    };

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

    db.sql(statement, (resultSet) => {
      props.navigation.pop();
    });
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
                let tempScannedFood = [...scannedFoods];

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

                tempScannedFood.push(data);
                setScannedFoods(data);
                setData(data);
                setScanned(true);
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

  if (hasPermission === null) {
    return (
      <View>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View>
        <Text>No access to camera</Text>
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

              <Image
                style={[
                  styles.productImage,
                  { width: screenWidth * 0.8, height: screenWidth * 0.9 },
                ]}
                source={{
                  uri: data.image,
                }}
              />
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
                <Button title="Scan another" />
                <Button title="Done" />
              </View>
            </View>
          ) : (
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={{
                width: screenWidth,
                height: screenHeight,
              }}
            />
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
          <Button title="Submit" onPress={onSubmit} />
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
