import React, { useState } from 'react';
import { useRouter } from 'next/router';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import styles from '@/styles/InputCard.module.css';

export default function InputCard(props) {
    const [mealDate, setDate] = useState(new Date());
    const [diningHall, setDiningHall] = useState();
    const [mealType, setMealType] = useState();
    const router = useRouter();

    const handleNutritionButtonClick = () => {
        // router.push('/menu');
        router.push({
            pathname: '/menu',
            query: {
                dining_hall: diningHall,
                meal: mealType,
                date: mealDate.toISOString()
            }, 
        }, '/menu')
    };

    return (
        <div className={styles.container}>
            <div className={styles.main_container}>
                <div className={styles.container_header}>Buzz Bite</div>

                <div className={styles.bottom_container}>
                    <div className={styles.button_header}>Select Dining Hall</div>
                    <div className={styles.dining_hall_buttons}>
                        <button className={"brittain" === diningHall ? styles.active_button : styles.button} onClick={() => {setDiningHall("brittain")}}>Brittain</button>
                        <button className={"north-ave-dining-hall" === diningHall ? styles.active_button : styles.button}  onClick={() => {setDiningHall("north-ave-dining-hall")}}>North Avenue</button>
                        <button className={"west-village" === diningHall ? styles.active_button : styles.button}  onClick={() => {setDiningHall("west-village")}}>West Village</button>
                    </div>

                    <div className={styles.button_header}>Select Meal Type</div>
                    <div className={styles.dining_hall_buttons}>
                        <button className={"breakfast" === mealType ? styles.active_button : styles.button}  onClick={() => {setMealType("breakfast")}}>Breakfast</button>
                        <button className={"lunch" === mealType ? styles.active_button : styles.button}  onClick={() => {setMealType("lunch")}}>Lunch</button>
                        <button className={"dinner" === mealType ? styles.active_button : styles.button}  onClick={() => {setMealType("dinner")}}>Dinner</button>
                    </div>

                    <div className={styles.bottom_buttons}> 
                        <div className={styles.date}>
                            <div className={styles.date_picker}>
                                Select Date:<DatePicker className={styles.picker} selected={mealDate} onChange={(date) => setDate(date)}/>
                                <button className={styles.nutrition_button} onClick={handleNutritionButtonClick}>Get Nutrition</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
