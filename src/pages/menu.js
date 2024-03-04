import React from 'react';
import Header from '@/components/Header'
import MenuCard from '@/components/MenuCard';
import { useRouter } from 'next/router';

export default function Menu() {
  const router = useRouter();
  const {dining_hall, meal, date} = router.query;
  const year = date.substring(0, 4)
  let month = date.substring(5, 7)
  let day = date.substring(8, 10)

  if (date.substring(5, 6) === '0') {
    month = date.substring(6, 7)
  } 
  
  if (date.substring(8, 9) === '0') {
    day = date.substring(9, 10)
  }
  // console.log("month " + month)
  // console.log("day " + day)
  return ( 
    <div>
      <Header/>
      <MenuCard dining_hall={dining_hall} meal={meal} year={year} month={month} day={day}/>
    </div>
  )
}
