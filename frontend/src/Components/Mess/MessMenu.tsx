import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";

const MessMenu = () => {
  // Sample mess menu data
  const menu = [
    {
      day: "Monday",
      breakfast: "Idli & Sambar",
      lunch: "Rice, Dal, Paneer Curry",
      dinner: "Chapati, Mixed Veg Curry",
    },
    {
      day: "Tuesday",
      breakfast: "Poha & Chutney",
      lunch: "Rice, Rajma, Salad",
      dinner: "Paratha & Aloo Sabzi",
    },
    {
      day: "Wednesday",
      breakfast: "Aloo Paratha & Curd",
      lunch: "Rice, Chole, Raita",
      dinner: "Pulao & Veg Curry",
    },
    {
      day: "Thursday",
      breakfast: "Upma & Coconut Chutney",
      lunch: "Rice, Sambhar, Potato Fry",
      dinner: "Noodles & Manchurian",
    },
    {
      day: "Friday",
      breakfast: "Dosa & Tomato Chutney",
      lunch: "Rice, Dal, Veg Kurma",
      dinner: "Chapati & Dal Tadka",
    },
    {
      day: "Saturday",
      breakfast: "Bread Toast & Jam",
      lunch: "Biryani & Raita",
      dinner: "Poori & Chole",
    },
    {
      day: "Sunday",
      breakfast: "Pancakes & Syrup",
      lunch: "Rice, Fish Curry / Veg Curry",
      dinner: "Fried Rice & Gobi Manchurian",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">
        Weekly Mess Menu
      </h1>
      <Table className="w-full max-w-4xl bg-white shadow-md rounded-lg">
        <TableHeader>
          <TableRow>
            <TableHead className="px-4 py-2 text-left text-purple-600 justify-center">
              Day
            </TableHead>
            <TableHead className="px-4 py-2 text-left text-purple-600 justify-center">
              Breakfast
            </TableHead>
            <TableHead className="px-4 py-2 text-left text-purple-600 justify-center">
              Lunch
            </TableHead>
            <TableHead className="px-4 py-2 text-left text-purple-600 justify-center">
              Dinner
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {menu.map((meal, index) => (
            <TableRow key={index}>
              <TableCell className="border px-4 py-2 font-medium text-gray-800">
                {meal.day}
              </TableCell>
              <TableCell className="border px-4 py-2 text-gray-700">
                {meal.breakfast}
              </TableCell>
              <TableCell className="border px-4 py-2 text-gray-700">
                {meal.lunch}
              </TableCell>
              <TableCell className="border px-4 py-2 text-gray-700">
                {meal.dinner}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MessMenu;
