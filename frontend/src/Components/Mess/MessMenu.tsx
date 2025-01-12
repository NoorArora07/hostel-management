'use client'
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import pic from '@/Photos/messmenu.jpg';

export default function MessMenu() {
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
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${pic})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-xl max-w-4xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-purple-700 text-center">
          Weekly Mess Menu
        </h1>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-4 py-2 text-left text-purple-600">Day</TableHead>
                <TableHead className="px-4 py-2 text-left text-purple-600">Breakfast</TableHead>
                <TableHead className="px-4 py-2 text-left text-purple-600">Lunch</TableHead>
                <TableHead className="px-4 py-2 text-left text-purple-600">Dinner</TableHead>
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
      </div>
    </div>
  );
}

