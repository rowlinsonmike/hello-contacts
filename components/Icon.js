import React from "react";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";

export default function Icon({
  name = "email",
  size = 32,
  color = "green",
  type = "material",
}) {
  let Icon = null;
  switch (type) {
    case "material":
      Icon = MaterialIcons;
      break;
    case "ant":
      Icon = AntDesign;
      break;
    default:
      Icon = MaterialIcons;
  }
  return <Icon name={name} size={size} color={color} />;
}
