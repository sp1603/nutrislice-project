import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import styles from "@/styles/MenuCard.module.css";

export default function MenuCard(props) {
  const {dining_hall, meal, year, month, day} = props;
  const [items, setItems] = useState({});
  const [nutrition, setNutrition] = useState({});

  useEffect(() => {
    async function fetchData() {

      const response = await fetch(`/api/food?dining_hall=${dining_hall}&meal=${meal}&year=${year}&month=${month}&day=${day}`);
      if (!response.ok) {
        return;
      }

      const data = await response.json();
      setItems(data);

      const foodItems = Object.values(data).flat();

      const nutritionResponse = await fetch(`/api/calories?food=${foodItems.join('')}`);
      const nutritionData = await nutritionResponse.json();
      setNutrition(nutritionData);
      console.log(nutrition)
    }

    fetchData();
  }, [dining_hall, meal, year, month, day]);

  const itemsArray = Object.entries(items);
  const getValue = (value, index) => {return (nutrition.items && index < nutrition.items.length && nutrition.items[index]?.[value]) || "N/A"};

  return (
    <div className={styles.container}>
      <div className={styles.table_container}>
        <Table className={styles.table} isStriped aria-label="table">
          <TableHeader>
            <TableColumn>NAME</TableColumn>
            <TableColumn>STATION</TableColumn>
            <TableColumn>SERVING SIZE</TableColumn>
            <TableColumn>CALORIES</TableColumn>
            <TableColumn>TOTAL FAT</TableColumn>
            <TableColumn>SATURATED FAT</TableColumn>
            <TableColumn>CHOLESTEROL</TableColumn>
            <TableColumn>SODIUM</TableColumn>
            <TableColumn>CARBOHYDRATES</TableColumn>
            <TableColumn>FIBER</TableColumn>
            <TableColumn>SUGAR</TableColumn>
            <TableColumn>PROTEIN</TableColumn>
          </TableHeader>
          <TableBody>
            {itemsArray.map(([station, foodItems]) => (
              foodItems.map((foodItem, index) => (
                <TableRow key={`${station}-${index}`}>
                  <TableCell>{foodItem}</TableCell>
                  <TableCell>{station}</TableCell>
                  <TableCell>{getValue('serving_size_g', index)}</TableCell>
                  <TableCell>{getValue('calories', index)}</TableCell>
                  <TableCell>{getValue('fat_total_g', index)}</TableCell>
                  <TableCell>{getValue('fat_saturated_g', index)}</TableCell>
                  <TableCell>{getValue('cholesterol_mg', index)}</TableCell>
                  <TableCell>{getValue('sodium_mg', index)}</TableCell>
                  <TableCell>{getValue('carbohydrates_total_g', index)}</TableCell>
                  <TableCell>{getValue('fiber_g', index)}</TableCell>
                  <TableCell>{getValue('sugar_g', index)}</TableCell>
                  <TableCell>{getValue('protein_g', index)}</TableCell>
                </TableRow>
              ))
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
