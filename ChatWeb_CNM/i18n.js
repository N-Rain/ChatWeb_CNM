// import các modules cần thiết
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// khởi tạo i18next instance
i18n
  .use(initReactI18next) // sử dụng initReactI18next
  .init({
    resources: {
      // định nghĩa các ngôn ngữ và tệp tin dịch
      en: {
        translation: {
          // các chuỗi dịch cho tiếng Anh
        }
      },
      // thêm các ngôn ngữ khác nếu cần
    },
    lng: 'en', // ngôn ngữ mặc định
    fallbackLng: 'en', // ngôn ngữ dự phòng
    interpolation: {
      escapeValue: false // không escape các giá trị
    }
  });

// export i18n để sử dụng trong ứng dụng React
export default i18n;
