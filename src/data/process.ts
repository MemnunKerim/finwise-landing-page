import {
  BsClipboardCheck,
  BsTruck,
  BsGraphUpArrow,
  BsBoxArrowDown
} from "react-icons/bs";
import { IProcessStep } from "@/types";

export const processSteps: IProcessStep[] = [
  {
    id: 1,
    title: "Depo Talebi Oluşturun",
    desc: "Palet sayısı, özellikler ve sürenizi girerek talebinizi oluşturun.",
    icon: BsClipboardCheck,
  },
  {
    id: 2,
    title: "Onay ve Gönderim",
    desc: "Paletlerinizi depoya ulaştırın; ekibimiz teslim alıp kaydeder.",
    icon: BsTruck,
  },
  {
    id: 3,
    title: "Depolama ve Yönetim",
    desc: "Envanterinizi panelden canlı izleyin; fatura & raporlar otomatik.",
    icon: BsGraphUpArrow,
  },
  {
    id: 4,
    title: "Teslim Alma",
    desc: "Talebinizde belirtilen tarihte paletleriniz yüklenmeye hazır.",
    icon: BsBoxArrowDown,
  },
];
