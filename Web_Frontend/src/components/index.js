import FormGroupInput from "./Inputs/formGroupInput.vue";

import DropDown from "./Dropdown.vue";
import PaperTableEdit from "./PaperTableEdit.vue";
import Button from "./Button";

import Card from "./Cards/Card.vue";
import ChartCard from "./Cards/ChartCard.vue";
import StatsCard from "./Cards/StatsCard.vue";
import ChartCardEdit from "./Cards/ChartCardEdit.vue";
import StatsCardEdit from "./Cards/StatsCardEdit.vue";

import SidebarPlugin from "./SidebarPlugin/index";

let components = {
  FormGroupInput,
  Card,
  ChartCard,
  ChartCardEdit,
  StatsCard,
  StatsCardEdit,
  DropDown,
  SidebarPlugin,
  PaperTableEdit,
};

export default components;

export {
  FormGroupInput,
  Card,
  ChartCard,
  ChartCardEdit,
  StatsCard,
  StatsCardEdit,
  DropDown,
  Button,
  SidebarPlugin,
  PaperTableEdit,
};
