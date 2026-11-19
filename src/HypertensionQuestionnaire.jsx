
import React, { useState } from "react";
import "./HypertensionQuestionnaire.css";


const questionnaireTranslations = {
  hi: {
    "Section A – Patient Information": "खंड A – रोगी की जानकारी",
    "Section B – Physical and Clinical Information": "खंड B – शारीरिक और चिकित्सकीय जानकारी",
    "Section C – Lifestyle and Risk Factors": "खंड C – जीवनशैली और जोखिम कारक",
    "Section D – Treatment and Disease Management": "खंड D – उपचार और रोग प्रबंधन",

    "What is your age?": "आपकी आयु कितनी है?",
    "What is your sex?": "आपका लिंग क्या है?",
    "What is your residential and socioeconomic background?": "आपकी आवासीय और सामाजिक-आर्थिक पृष्ठभूमि क्या है?",
    "What are your current physical measurements?": "आपके वर्तमान शारीरिक माप क्या हैं?",
    "What is your current blood pressure reading?": "आपका वर्तमान रक्तचाप कितना है?",
    "Have you ever been diagnosed with hypertension (high blood pressure) by a healthcare professional?": "क्या किसी स्वास्थ्यकर्मी ने आपको कभी उच्च रक्तचाप होने की पुष्टि की है?",
    "Does anyone in your immediate family have a history of hypertension?": "क्या आपके निकट परिवार में किसी को उच्च रक्तचाप रहा है?",
    "Do you have any other diagnosed medical conditions?": "क्या आपको कोई अन्य चिकित्सकीय बीमारी है?",
    "Do you currently use tobacco in any form?": "क्या आप वर्तमान में किसी भी रूप में तंबाकू का सेवन करते हैं?",
    "How frequently do you consume alcohol?": "आप कितनी बार शराब का सेवन करते हैं?",
    "How would you describe your daily salt consumption?": "आप प्रतिदिन कितना नमक खाते हैं?",
    "How physically active are you on a typical day?": "आप सामान्य दिन में कितने शारीरिक रूप से सक्रिय रहते हैं?",
    "How would you describe your sleep and stress levels?": "आपकी नींद और तनाव का स्तर कैसा है?",
    "Are you currently taking any medication for hypertension?": "क्या आप वर्तमान में उच्च रक्तचाप की दवा ले रहे हैं?",
    "Do you ever miss or skip your prescribed blood pressure medication?": "क्या आप कभी रक्तचाप की निर्धारित दवा लेना भूलते या छोड़ते हैं?",

    "Age (years)": "आयु (वर्ष)",
    "Sex": "लिंग",
    "Currently pregnant": "वर्तमान में गर्भवती",
    "History of hypertension during pregnancy": "गर्भावस्था के दौरान उच्च रक्तचाप का इतिहास",
    "Residence": "निवास क्षेत्र",
    "Education": "शिक्षा",
    "Occupation": "व्यवसाय",
    "Other occupation": "अन्य व्यवसाय",
    "Height (cm)": "ऊँचाई (सेमी)",
    "Weight (kg)": "वजन (किग्रा)",
    "Waist circumference (cm)": "कमर की परिधि (सेमी)",
    "Systolic BP (mmHg)": "सिस्टोलिक रक्तचाप (mmHg)",
    "Diastolic BP (mmHg)": "डायस्टोलिक रक्तचाप (mmHg)",
    "Pulse rate (beats/minute)": "नाड़ी की दर (धड़कन/मिनट)",
    "Arm used": "माप के लिए उपयोग किया गया हाथ",
    "Measurement date and time": "माप की तारीख और समय",
    "Diagnosis": "निदान",
    "Duration": "अवधि",
    "Age at diagnosis (years), if known": "निदान के समय आयु (वर्ष), यदि ज्ञात हो",
    "Family history": "पारिवारिक इतिहास",
    "If yes, who?": "यदि हाँ, तो कौन?",
    "Diagnosed medical conditions": "पहले से निदान की गई बीमारियाँ",
    "Other condition (specify)": "अन्य बीमारी का विवरण",
    "Tobacco use": "तंबाकू का सेवन",
    "Alcohol frequency": "शराब सेवन की आवृत्ति",
    "Salt consumption": "नमक का सेवन",
    "Do you regularly add extra salt to your food?": "क्या आप भोजन में नियमित रूप से अतिरिक्त नमक डालते हैं?",
    "Do you frequently consume pickles, papad, packaged snacks or processed foods?": "क्या आप अक्सर अचार, पापड़, पैकेट वाले स्नैक्स या प्रसंस्कृत खाद्य पदार्थ खाते हैं?",
    "Physical activity": "शारीरिक गतिविधि",
    "Average minutes of physical activity per day": "प्रतिदिन शारीरिक गतिविधि के औसत मिनट",
    "Average sleep duration": "औसत नींद की अवधि",
    "Sleep quality": "नींद की गुणवत्ता",
    "Perceived stress": "महसूस किया गया तनाव",
    "Medication status": "दवा लेने की स्थिति",
    "Medicine name(s)": "दवा का नाम",
    "Dosage, if known": "खुराक, यदि ज्ञात हो",
    "Duration of treatment": "उपचार की अवधि",
    "Prescribed by": "दवा किसने लिखी",
    "Medication adherence": "दवा लेने की नियमितता",
    "If applicable, what is the main reason?": "यदि लागू हो, तो मुख्य कारण क्या है?",
    "Other reason (specify)": "अन्य कारण का विवरण",

    "Male": "पुरुष",
    "Female": "महिला",
    "Intersex": "अंतर्लिंगी",
    "Prefer not to disclose": "बताना नहीं चाहते",
    "Yes": "हाँ",
    "No": "नहीं",
    "Unknown": "अज्ञात",
    "Urban": "शहरी",
    "Rural": "ग्रामीण",
    "Semi-urban": "अर्ध-शहरी",
    "No formal education": "कोई औपचारिक शिक्षा नहीं",
    "Primary": "प्राथमिक",
    "Secondary": "माध्यमिक",
    "Higher secondary": "उच्च माध्यमिक",
    "Graduate": "स्नातक",
    "Postgraduate": "स्नातकोत्तर",
    "Student": "विद्यार्थी",
    "Homemaker": "गृहिणी / गृहकार्य करने वाले",
    "Employed": "नौकरीपेशा",
    "Self-employed": "स्वरोजगार",
    "Retired": "सेवानिवृत्त",
    "Unemployed": "बेरोजगार",
    "Other": "अन्य",
    "Right": "दायाँ",
    "Left": "बायाँ",
    "Less than 1 year": "1 वर्ष से कम",
    "1–5 years": "1–5 वर्ष",
    "6–10 years": "6–10 वर्ष",
    "More than 10 years": "10 वर्ष से अधिक",
    "Don't know": "पता नहीं",
    "Father": "पिता",
    "Mother": "माता",
    "Both parents": "माता-पिता दोनों",
    "Siblings": "भाई-बहन",
    "Other close family members": "अन्य निकट परिवारजन",
    "Diabetes mellitus": "मधुमेह",
    "Chronic kidney disease": "दीर्घकालिक गुर्दा रोग",
    "Heart disease": "हृदय रोग",
    "High cholesterol (dyslipidemia)": "उच्च कोलेस्ट्रॉल",
    "Thyroid disorder": "थायरॉइड विकार",
    "Previous stroke": "पहले स्ट्रोक हुआ है",
    "None": "कोई नहीं",
    "Other (specify)": "अन्य (विवरण दें)",
    "Never used": "कभी उपयोग नहीं किया",
    "Former user": "पहले उपयोग करते थे",
    "Current smoker": "वर्तमान में धूम्रपान",
    "Current smokeless tobacco user": "वर्तमान में बिना धुएँ वाला तंबाकू",
    "Both smoking and smokeless tobacco": "दोनों प्रकार का तंबाकू",
    "Never": "कभी नहीं",
    "Occasionally": "कभी-कभी",
    "1–2 days per week": "सप्ताह में 1–2 दिन",
    "3–5 days per week": "सप्ताह में 3–5 दिन",
    "Daily": "प्रतिदिन",
    "Low": "कम",
    "Moderate": "मध्यम",
    "High": "अधिक",
    "Sedentary (little or no exercise)": "निष्क्रिय (बहुत कम या कोई व्यायाम नहीं)",
    "Light activity": "हल्की गतिविधि",
    "Moderate activity": "मध्यम गतिविधि",
    "Vigorous activity": "तीव्र गतिविधि",
    "Less than 5 hours": "5 घंटे से कम",
    "5–6 hours": "5–6 घंटे",
    "7–8 hours": "7–8 घंटे",
    "More than 8 hours": "8 घंटे से अधिक",
    "Good": "अच्छी",
    "Average": "औसत",
    "Poor": "खराब",
    "Yes, regularly": "हाँ, नियमित रूप से",
    "Yes, but irregularly": "हाँ, लेकिन अनियमित रूप से",
    "Previously prescribed, but discontinued": "पहले निर्धारित थी, अब बंद कर दी",
    "Government hospital": "सरकारी अस्पताल",
    "Private hospital": "निजी अस्पताल",
    "Other healthcare provider": "अन्य स्वास्थ्य सेवा प्रदाता",
    "Rarely": "बहुत कम",
    "Sometimes": "कभी-कभी",
    "Often": "अक्सर",
    "Always": "हमेशा",
    "Not applicable (not prescribed medication)": "लागू नहीं (दवा निर्धारित नहीं है)",
    "Forgetfulness": "भूल जाना",
    "Financial difficulties": "आर्थिक कठिनाइयाँ",
    "Side effects": "दुष्प्रभाव",
    "Feeling better or believing medication is unnecessary": "बेहतर महसूस करना या दवा अनावश्यक समझना",
    "Lack of availability": "दवा उपलब्ध न होना",
    "Fear of long-term medication": "लंबे समय तक दवा लेने का डर",
    "Select an option": "विकल्प चुनें",
    "Data Collector Notes": "डेटा संग्रहकर्ता की टिप्पणियाँ",
    "Additional observations by the data collector": "डेटा संग्रहकर्ता के अतिरिक्त अवलोकन",
    "Data collector's remarks": "डेटा संग्रहकर्ता की टिप्पणी",
    "Hypertension Research Questionnaire": "उच्च रक्तचाप अनुसंधान प्रश्नावली",
    "Research data collection • 15 questions": "अनुसंधान डेटा संग्रह • 15 प्रश्न"
  },

  gu: {
    "Section A – Patient Information": "વિભાગ A – દર્દીની માહિતી",
    "Section B – Physical and Clinical Information": "વિભાગ B – શારીરિક અને તબીબી માહિતી",
    "Section C – Lifestyle and Risk Factors": "વિભાગ C – જીવનશૈલી અને જોખમી પરિબળો",
    "Section D – Treatment and Disease Management": "વિભાગ D – સારવાર અને રોગ વ્યવસ્થાપન",

    "What is your age?": "તમારી ઉંમર કેટલી છે?",
    "What is your sex?": "તમારું લિંગ શું છે?",
    "What is your residential and socioeconomic background?": "તમારી રહેઠાણ અને સામાજિક-આર્થિક પૃષ્ઠભૂમિ શું છે?",
    "What are your current physical measurements?": "તમારા હાલના શારીરિક માપ શું છે?",
    "What is your current blood pressure reading?": "તમારું હાલનું બ્લડ પ્રેશર કેટલું છે?",
    "Have you ever been diagnosed with hypertension (high blood pressure) by a healthcare professional?": "શું કોઈ આરોગ્ય નિષ્ણાતે તમને ક્યારેય હાઈ બ્લડ પ્રેશર હોવાનું નિદાન કર્યું છે?",
    "Does anyone in your immediate family have a history of hypertension?": "શું તમારા નજીકના પરિવારમાં કોઈને હાઈ બ્લડ પ્રેશરનો ઇતિહાસ છે?",
    "Do you have any other diagnosed medical conditions?": "શું તમને અન્ય કોઈ નિદાન થયેલી બીમારી છે?",
    "Do you currently use tobacco in any form?": "શું તમે હાલમાં કોઈપણ સ્વરૂપમાં તમાકુનું સેવન કરો છો?",
    "How frequently do you consume alcohol?": "તમે કેટલી વાર દારૂનું સેવન કરો છો?",
    "How would you describe your daily salt consumption?": "તમે દરરોજ કેટલું મીઠું ખાઓ છો?",
    "How physically active are you on a typical day?": "સામાન્ય દિવસે તમે કેટલી શારીરિક પ્રવૃત્તિ કરો છો?",
    "How would you describe your sleep and stress levels?": "તમારી ઊંઘ અને તણાવનું સ્તર કેવું છે?",
    "Are you currently taking any medication for hypertension?": "શું તમે હાલમાં હાઈ બ્લડ પ્રેશરની દવા લો છો?",
    "Do you ever miss or skip your prescribed blood pressure medication?": "શું તમે ક્યારેય બ્લડ પ્રેશરની લખી આપેલી દવા લેવાનું ભૂલી જાઓ છો અથવા છોડો છો?",

    "Age (years)": "ઉંમર (વર્ષ)",
    "Sex": "લિંગ",
    "Currently pregnant": "હાલમાં ગર્ભવતી",
    "History of hypertension during pregnancy": "ગર્ભાવસ્થા દરમિયાન હાઈ બ્લડ પ્રેશરનો ઇતિહાસ",
    "Residence": "રહેઠાણ",
    "Education": "શિક્ષણ",
    "Occupation": "વ્યવસાય",
    "Other occupation": "અન્ય વ્યવસાય",
    "Height (cm)": "ઊંચાઈ (સેમી)",
    "Weight (kg)": "વજન (કિગ્રા)",
    "Waist circumference (cm)": "કમરનો ઘેરાવો (સેમી)",
    "Systolic BP (mmHg)": "સિસ્ટોલિક બ્લડ પ્રેશર (mmHg)",
    "Diastolic BP (mmHg)": "ડાયસ્ટોલિક બ્લડ પ્રેશર (mmHg)",
    "Pulse rate (beats/minute)": "નાડીના ધબકારા (પ્રતિ મિનિટ)",
    "Arm used": "માપ માટે વપરાયેલ હાથ",
    "Measurement date and time": "માપની તારીખ અને સમય",
    "Diagnosis": "નિદાન",
    "Duration": "સમયગાળો",
    "Age at diagnosis (years), if known": "નિદાન સમયે ઉંમર (વર્ષ), જો ખબર હોય",
    "Family history": "કૌટુંબિક ઇતિહાસ",
    "If yes, who?": "જો હા, તો કોણ?",
    "Diagnosed medical conditions": "નિદાન થયેલી બીમારીઓ",
    "Other condition (specify)": "અન્ય બીમારી જણાવો",
    "Tobacco use": "તમાકુનું સેવન",
    "Alcohol frequency": "દારૂના સેવનની આવર્તનતા",
    "Salt consumption": "મીઠાનું સેવન",
    "Do you regularly add extra salt to your food?": "શું તમે ખોરાકમાં નિયમિત વધારાનું મીઠું ઉમેરો છો?",
    "Do you frequently consume pickles, papad, packaged snacks or processed foods?": "શું તમે વારંવાર અથાણાં, પાપડ, પેકેટ નાસ્તા અથવા પ્રોસેસ્ડ ખોરાક ખાઓ છો?",
    "Physical activity": "શારીરિક પ્રવૃત્તિ",
    "Average minutes of physical activity per day": "દરરોજ શારીરિક પ્રવૃત્તિની સરેરાશ મિનિટ",
    "Average sleep duration": "ઊંઘનો સરેરાશ સમય",
    "Sleep quality": "ઊંઘની ગુણવત્તા",
    "Perceived stress": "અનુભવાતો તણાવ",
    "Medication status": "દવા લેવાની સ્થિતિ",
    "Medicine name(s)": "દવાનાં નામ",
    "Dosage, if known": "દવાની માત્રા, જો ખબર હોય",
    "Duration of treatment": "સારવારનો સમયગાળો",
    "Prescribed by": "દવા કોણે લખી આપી",
    "Medication adherence": "દવા લેવાની નિયમિતતા",
    "If applicable, what is the main reason?": "જો લાગુ પડતું હોય, તો મુખ્ય કારણ શું છે?",
    "Other reason (specify)": "અન્ય કારણ જણાવો",

    "Male": "પુરુષ",
    "Female": "સ્ત્રી",
    "Intersex": "આંતરલિંગી",
    "Prefer not to disclose": "જણાવવા માંગતા નથી",
    "Yes": "હા",
    "No": "ના",
    "Unknown": "ખબર નથી",
    "Urban": "શહેરી",
    "Rural": "ગ્રામીણ",
    "Semi-urban": "અર્ધશહેરી",
    "No formal education": "કોઈ ઔપચારિક શિક્ષણ નથી",
    "Primary": "પ્રાથમિક",
    "Secondary": "માધ્યમિક",
    "Higher secondary": "ઉચ્ચતર માધ્યમિક",
    "Graduate": "સ્નાતક",
    "Postgraduate": "અનુસ્નાતક",
    "Student": "વિદ્યાર્થી",
    "Homemaker": "ગૃહકાર્ય સંભાળનાર",
    "Employed": "નોકરી કરતા",
    "Self-employed": "સ્વરોજગારી",
    "Retired": "નિવૃત્ત",
    "Unemployed": "બેરોજગાર",
    "Other": "અન્ય",
    "Right": "જમણો",
    "Left": "ડાબો",
    "Less than 1 year": "1 વર્ષથી ઓછું",
    "1–5 years": "1–5 વર્ષ",
    "6–10 years": "6–10 વર્ષ",
    "More than 10 years": "10 વર્ષથી વધુ",
    "Don't know": "ખબર નથી",
    "Father": "પિતા",
    "Mother": "માતા",
    "Both parents": "માતા અને પિતા બંને",
    "Siblings": "ભાઈ-બહેન",
    "Other close family members": "અન્ય નજીકના પરિવારજનો",
    "Diabetes mellitus": "ડાયાબિટીસ",
    "Chronic kidney disease": "લાંબા ગાળાની કિડનીની બીમારી",
    "Heart disease": "હૃદયરોગ",
    "High cholesterol (dyslipidemia)": "વધુ કોલેસ્ટ્રોલ",
    "Thyroid disorder": "થાઇરોઇડની બીમારી",
    "Previous stroke": "અગાઉ સ્ટ્રોક થયેલો",
    "None": "કોઈ નહીં",
    "Other (specify)": "અન્ય (જણાવો)",
    "Never used": "ક્યારેય ઉપયોગ કર્યો નથી",
    "Former user": "અગાઉ ઉપયોગ કરતા હતા",
    "Current smoker": "હાલમાં ધૂમ્રપાન કરે છે",
    "Current smokeless tobacco user": "હાલમાં ધુમાડા વગરની તમાકુ વાપરે છે",
    "Both smoking and smokeless tobacco": "બંને પ્રકારની તમાકુ",
    "Never": "ક્યારેય નહીં",
    "Occasionally": "ક્યારેક",
    "1–2 days per week": "અઠવાડિયામાં 1–2 દિવસ",
    "3–5 days per week": "અઠવાડિયામાં 3–5 દિવસ",
    "Daily": "દરરોજ",
    "Low": "ઓછું",
    "Moderate": "મધ્યમ",
    "High": "વધુ",
    "Sedentary (little or no exercise)": "નિષ્ક્રિય (ખૂબ ઓછી અથવા કોઈ કસરત નહીં)",
    "Light activity": "હળવી પ્રવૃત્તિ",
    "Moderate activity": "મધ્યમ પ્રવૃત્તિ",
    "Vigorous activity": "તીવ્ર પ્રવૃત્તિ",
    "Less than 5 hours": "5 કલાકથી ઓછું",
    "5–6 hours": "5–6 કલાક",
    "7–8 hours": "7–8 કલાક",
    "More than 8 hours": "8 કલાકથી વધુ",
    "Good": "સારી",
    "Average": "સરેરાશ",
    "Poor": "નબળી",
    "Yes, regularly": "હા, નિયમિત",
    "Yes, but irregularly": "હા, પરંતુ અનિયમિત",
    "Previously prescribed, but discontinued": "અગાઉ લખી આપી હતી, હવે બંધ કરી",
    "Government hospital": "સરકારી હોસ્પિટલ",
    "Private hospital": "ખાનગી હોસ્પિટલ",
    "Other healthcare provider": "અન્ય આરોગ્ય સેવા પ્રદાતા",
    "Rarely": "ભાગ્યે જ",
    "Sometimes": "ક્યારેક",
    "Often": "વારંવાર",
    "Always": "હંમેશા",
    "Not applicable (not prescribed medication)": "લાગુ પડતું નથી (દવા લખી આપી નથી)",
    "Forgetfulness": "ભૂલી જવું",
    "Financial difficulties": "આર્થિક મુશ્કેલી",
    "Side effects": "આડઅસરો",
    "Feeling better or believing medication is unnecessary": "સારું લાગવું અથવા દવા જરૂરી નથી એવું માનવું",
    "Lack of availability": "દવા ઉપલબ્ધ ન હોવી",
    "Fear of long-term medication": "લાંબા સમય સુધી દવા લેવાનો ડર",
    "Select an option": "વિકલ્પ પસંદ કરો",
    "Data Collector Notes": "માહિતી એકત્ર કરનારની નોંધ",
    "Additional observations by the data collector": "માહિતી એકત્ર કરનારના વધારાના અવલોકનો",
    "Data collector's remarks": "માહિતી એકત્ર કરનારની ટિપ્પણી",
    "Hypertension Research Questionnaire": "હાઈ બ્લડ પ્રેશર સંશોધન પ્રશ્નાવલી",
    "Research data collection • 15 questions": "સંશોધન માહિતી સંગ્રહ • 15 પ્રશ્નો"
  }
};

const sections = [


  {
    title: "Section A – Patient Information",
    questions: [
      {
        n: 1, title: "What is your age?",
        fields: [["age", "Age (years)", "number"]]
      },
      {
        n: 2, title: "What is your sex?",
        fields: [["sex", "Sex", [
          "Male", "Female", "Intersex",
          "Prefer not to disclose"
        ]]],
        conditional: {
          key: "sex", equals: ["Female"],
          fields: [
            ["pregnant", "Currently pregnant", ["Yes", "No"]],
            ["pregnancyHypertension",
              "History of hypertension during pregnancy",
              ["Yes", "No", "Unknown"]]
          ]
        }
      },
      {
        n: 3,
        title: "What is your residential and socioeconomic background?",
        fields: [
          ["residence", "Residence", ["Urban", "Rural", "Semi-urban"]],
          ["education", "Education", [
            "No formal education", "Primary", "Secondary",
            "Higher secondary", "Graduate", "Postgraduate"
          ]],
          ["occupation", "Occupation", [
            "Student", "Homemaker", "Employed", "Self-employed",
            "Retired", "Unemployed", "Other"
          ]],
          ["occupationOther", "Other occupation", "text",
            "occupation", "Other"]
        ]
      }
    ]
  },
  {
    title: "Section B – Physical and Clinical Information",
    questions: [
      {
        n: 4, title: "What are your current physical measurements?",
        fields: [
          ["height", "Height (cm)", "number"],
          ["weight", "Weight (kg)", "number"],
          ["waist", "Waist circumference (cm)", "number"]
        ]
      },
      {
        n: 5, title: "What is your current blood pressure reading?",
        fields: [
          ["systolic", "Systolic BP (mmHg)", "number"],
          ["diastolic", "Diastolic BP (mmHg)", "number"],
          ["pulse", "Pulse rate (beats/minute)", "number"],
          ["arm", "Arm used", ["Right", "Left"]],
          ["measurementDateTime", "Measurement date and time",
            "datetime-local"]
        ]
      },
      {
        n: 6,
        title: "Have you ever been diagnosed with hypertension (high blood pressure) by a healthcare professional?",
        fields: [["diagnosed", "Diagnosis", ["Yes", "No"]]],
        conditional: {
          key: "diagnosed", equals: ["Yes"],
          fields: [
            ["diagnosisDuration", "Duration", [
              "Less than 1 year", "1–5 years",
              "6–10 years", "More than 10 years"
            ]],
            ["diagnosisAge", "Age at diagnosis (years), if known",
              "number"]
          ]
        }
      },
      {
        n: 7,
        title: "Does anyone in your immediate family have a history of hypertension?",
        fields: [["familyHistory", "Family history",
          ["Yes", "No", "Don't know"]]],
        conditional: {
          key: "familyHistory", equals: ["Yes"],
          fields: [["familyWho", "If yes, who?", [
            "Father", "Mother", "Both parents", "Siblings",
            "Other close family members"
          ], "multi"]]
        }
      },
      {
        n: 8,
        title: "Do you have any other diagnosed medical conditions?",
        fields: [
          ["conditions", "Diagnosed medical conditions", [
            "Diabetes mellitus", "Chronic kidney disease",
            "Heart disease", "High cholesterol (dyslipidemia)",
            "Thyroid disorder", "Previous stroke",
            "None", "Other (specify)"
          ], "multi"],
          ["conditionsOther", "Other condition (specify)",
            "text", "conditions", "Other (specify)"]
        ]
      }
    ]
  },
  {
    title: "Section C – Lifestyle and Risk Factors",
    questions: [
      {
        n: 9, title: "Do you currently use tobacco in any form?",
        fields: [["tobacco", "Tobacco use", [
          "Never used", "Former user", "Current smoker",
          "Current smokeless tobacco user",
          "Both smoking and smokeless tobacco"
        ]]]
      },
      {
        n: 10, title: "How frequently do you consume alcohol?",
        fields: [["alcohol", "Alcohol frequency", [
          "Never", "Occasionally", "1–2 days per week",
          "3–5 days per week", "Daily"
        ]]]
      },
      {
        n: 11,
        title: "How would you describe your daily salt consumption?",
        fields: [
          ["salt", "Salt consumption", ["Low", "Moderate", "High"]],
          ["extraSalt", "Do you regularly add extra salt to your food?",
            ["Yes", "No"]],
          ["processedFood",
            "Do you frequently consume pickles, papad, packaged snacks or processed foods?",
            ["Yes", "No"]]
        ]
      },
      {
        n: 12,
        title: "How physically active are you on a typical day?",
        fields: [
          ["activity", "Physical activity", [
            "Sedentary (little or no exercise)",
            "Light activity", "Moderate activity",
            "Vigorous activity"
          ]],
          ["activityMinutes",
            "Average minutes of physical activity per day", "number"]
        ]
      },
      {
        n: 13,
        title: "How would you describe your sleep and stress levels?",
        fields: [
          ["sleepDuration", "Average sleep duration", [
            "Less than 5 hours", "5–6 hours",
            "7–8 hours", "More than 8 hours"
          ]],
          ["sleepQuality", "Sleep quality",
            ["Good", "Average", "Poor"]],
          ["stress", "Perceived stress",
            ["Low", "Moderate", "High"]]
        ]
      }
    ]
  },
  {
    title: "Section D – Treatment and Disease Management",
    questions: [
      {
        n: 14,
        title: "Are you currently taking any medication for hypertension?",
        fields: [["medication", "Medication status", [
          "Yes, regularly", "Yes, but irregularly",
          "No", "Previously prescribed, but discontinued"
        ]]],
        conditional: {
          key: "medication",
          equals: ["Yes, regularly", "Yes, but irregularly"],
          fields: [
            ["medicineNames", "Medicine name(s)", "text"],
            ["dosage", "Dosage, if known", "text"],
            ["treatmentDuration", "Duration of treatment", "text"],
            ["prescriber", "Prescribed by", [
              "Government hospital", "Private hospital",
              "Other healthcare provider"
            ]]
          ]
        }
      },
      {
        n: 15,
        title: "Do you ever miss or skip your prescribed blood pressure medication?",
        fields: [["missedMedication", "Medication adherence", [
          "Never", "Rarely", "Sometimes", "Often", "Always",
          "Not applicable (not prescribed medication)"
        ]]],
        conditional: {
          key: "missedMedication",
          equals: ["Rarely", "Sometimes", "Often", "Always"],
          fields: [
            ["skipReason", "If applicable, what is the main reason?", [
              "Forgetfulness", "Financial difficulties",
              "Side effects",
              "Feeling better or believing medication is unnecessary",
              "Lack of availability",
              "Fear of long-term medication", "Other (specify)"
            ]],
            ["skipReasonOther", "Other reason (specify)",
              "text", "skipReason", "Other (specify)"]
          ]
        }
      }
    ]
  }
];



export default function HypertensionQuestionnaire({
  language = "en",
  answers = {},
  onAnswersChange = () => {}
}) {

const tr = (text) =>
  questionnaireTranslations[language]?.[text] || text;



  
const set = (key, value) => {
  onAnswersChange({
    ...answers,
    [key]: value
  });
};


  const visible = field =>
    !field[3] || (
      Array.isArray(answers[field[3]])
        ? answers[field[3]].includes(field[4])
        : answers[field[3]] === field[4]
    );

  const renderField = field => {
    if (!visible(field)) return null;

    const [key, label, type, mode] = field;
    const isMulti = mode === "multi";

    return (
      <div className="cln-field" key={key}>
        
<label htmlFor={`cln-${key}`}>{tr(label)}</label>


        {Array.isArray(type) ? (
          isMulti ? (
            <div className="cln-options">
              {type.map(option => (
                <label key={option}>
                  <input
                    type="checkbox"
                    checked={(answers[key] || []).includes(option)}
                    onChange={e => set(
                      key,
                      e.target.checked
                        ? [
                            ...(answers[key] || []).filter(
                              v => !(option === "None" || v === "None")
                            ),
                            option
                          ]
                        : (answers[key] || []).filter(v => v !== option)
                    )}
                  />
                  
{tr(option)}

                </label>
              ))}
            </div>
          ) : (
            <select
              id={`cln-${key}`}
              value={answers[key] || ""}
              onChange={e => set(key, e.target.value)}
            >
              
<option value="">{tr("Select an option")}</option>
{type.map(option => (
  <option key={option} value={option}>
    {tr(option)}
  </option>
))}

            </select>
          )
        ) : (
          <input
            id={`cln-${key}`}
            type={type}
            value={answers[key] || ""}
            min={type === "number" ? "0" : undefined}
            step={type === "number" ? "any" : undefined}
            onChange={e => set(key, e.target.value)}
          />
        )}
      </div>
    );
  };

  const submit = async e => {
    e.preventDefault();
    setStatus("");

    if (!onSubmit) {
      setStatus(
        "Submission is not connected to the database yet."
      );
      return;
    }

    setBusy(true);

    try {
      await onSubmit({
        participantId,
        questionnaire: "hypertension",
        version: "2026-11",
        answers: { ...answers }
      });
      setStatus("Questionnaire submitted successfully.");
    } catch (error) {
      setStatus(
        "Submission failed: " +
        (error?.message || "Please try again.")
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    
<div className="cln-form">

      <header>
        <p>CLINOVA AI</p>
        <h1>Hypertension Research Questionnaire</h1>
        <small>Research data collection • 15 questions</small>
      </header>

      {sections.map(section => (
        <section key={section.title}>
          
<h2>{tr(section.title)}</h2>

          {section.questions.map(q => (
            <article key={q.n}>
              
<h3>Q{q.n}. {tr(q.title)}</h3>

              {q.fields.map(renderField)}

              {q.conditional &&
                q.conditional.equals.includes(
                  answers[q.conditional.key]
                ) &&
                q.conditional.fields.map(renderField)}
            </article>
          ))}
        </section>
      ))}

      <section>
        <h2>Data Collector Notes</h2>

        {[
          ["observations", "Additional observations by the data collector"],
          ["collectorRemarks", "Data collector's remarks"]
        ].map(([key, label]) => (
          <div className="cln-field" key={key}>
            <label htmlFor={`cln-${key}`}>{label}</label>
            <textarea
              id={`cln-${key}`}
              rows="3"
              value={answers[key] || ""}
              onChange={e => set(key, e.target.value)}
            />
          </div>
        ))}
      </section>

    </div>
  );
}
