import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import profilePageKa from "./ka/pages/profile.json";
import profilePageEn from "./en/pages/profile.json";

import InvoiceDetilePageKa from "./ka/pages/invoiceDetile.json";
import InvoiceDetilePageEn from "./en/pages/invoiceDetile.json";

import invoicesPageKa from "./ka/pages/invoices.json";
import invoicesPageEn from "./en/pages/invoices.json";

import authPageKa from "./ka/pages/auth.json";
import authPageEn from "./en/pages/auth.json";

const options = {
  order: ["path"],

  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,

  htmlTag: document.documentElement,
};

const langDetector = new LanguageDetector();

const resources = { 
  en: {
    translation: {
      "auth-page": authPageEn,
      "invoiceDetile-page": InvoiceDetilePageEn,
      "invoices-page": invoicesPageEn,
      "profile-page": profilePageEn,
    },
  },
  ka: {
    translation: {
      "auth-page": authPageKa,
      "invoiceDetile-page": InvoiceDetilePageKa,
      "invoices-page": invoicesPageKa,
      "profile-page": profilePageKa,
    },
  },
};

i18n
  .use(langDetector)
  .use(initReactI18next)
  .init({
    resources,
    detection: options,
    fallbackLng: "ka",

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
