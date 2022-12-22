const Yup = require('yup');


const adminSchema = Yup.object().shape({
  username: Yup.string()
    .required('نام کاربری الزامی می باشد')
    .min(4, 'نام کاربری نباید کمتر از 4 کاراکتر باشد'),
  password: Yup.string()
    .min(6, 'کلمه عبور نباید کمتر از 6 کاراکتر باشد')
    .required('کلمه عبور الزامی می باشد'),
});


const categorySchema = Yup.object().shape({
  name: Yup.string()
    .required('اسم دسته بندی الزامی می باشد')
    .min(3, 'اسم دسته بندی نباید کمتر از 3 کاراکتر باشد'),
  type: Yup.number()
    .required('نوع دسته بندی الزامی می باشد'),
});

const subCategorySchema = Yup.object().shape({
  name: Yup.string()
    .required('اسم زیر شاخه الزامی می باشد')
    .min(3, 'اسم زیر شاخه نباید کمتر از 3 کاراکتر باشد'),
  type: Yup.number()
    .required('نوع دسته بندی الزامی می باشد'),
  parentCategoryId: Yup.string()
    .required('شناسه دسته بندی الزامی است')
});

const miniSubCategorySchema = Yup.object().shape({
  name: Yup.string()
    .required('اسم زیر شاخه لایه دو الزامی می باشد')
    .min(3, 'اسم زیر شاخه لایه دو  نباید کمتر از 3 کاراکتر باشد'),
  type: Yup.number()
    .required('نوع دسته بندی الزامی می باشد'),
  parentCategoryId: Yup.string()
    .required('شناسه دسته بندی الزامی است'),
  subParentCategoryId: Yup.string()
    .required('شناسه زیر دسته بندی الزامی است'),
});

const districtPriceSchema = Yup.object().shape({
  city: Yup.string()
    .required('اسم شهر الزامی می باشد'),
  costType: Yup.number()
    .required('نوع قیمت دهی الزامی می باشد می باشد'),
  district: Yup.number()
    .required('انتخاب منطقه الزامی می باشد'),
  distance: Yup.number()
    .required('تعیین محدوده مسافتی برای جستجو الزامی می باشد'),
});
const agentSchema = Yup.object().shape({
  fullName: Yup.string()
    .required('نام و نام خانوادگی الزامی می باشد')
    .min(6, 'نام کاربری نباید کمتر از شش کاراکتر باشد'),
  phoneNumber: Yup.string()
    .min(11, 'شماره موبایل اشتباه است توجه داشته باشید حتما با صفر شروع شود')
    .max(11, 'شماره موبایل اشتباه است توجه داشته باشید حتما با صفر شروع شود')
    .required('شماره موبایل الزامی می باشد'),
  nationalId: Yup.string()
    .min(10, 'کد ملی اشتباه است')
    .max(10, 'کد ملی اشتباه است')
    .required('کد ملی الزامی می باشد'),
  birthDate: Yup.string()
    .required('تاریخ تولد الزامی می باشد'),
  maritalStatus: Yup.boolean()
    .required('وضعیت تاهل الزامی می باشد'),
  skills: Yup.array()
    .required('مهارت ها الزامی می باشد'),
  landline: Yup.string()
    .required('شماره ثابت الزامی می باشد'),
  address: Yup.string()
    .required('آدرس الزامی می باشد'),
  lat: Yup.number()
    .required('مختصات جغرافیایی الزامی می باشد'),
  lng: Yup.number()
    .required('مختصات حغرافیایی الزامی می باشد'),
  fatherName: Yup.string()
    .min(3, 'نام پدر حداقل سه کاراکتر می باشد')
    .max(12, 'نام پدر حداکثر دوازده کاراکتر می باشد')
    .required('کد ملی الزامی می باشد'),
  gender: Yup.string()
    .required('انتخاب جنسیت الزامی می باشد'),
  password: Yup.string()
    .min(4, 'کلمه عبور نباید کمتر از چهار کاراکتر باشد')
    .required('کلمه عبور الزامی می باشد'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'کلمه عبور باید تطابق داشته باشد'),
  categoryIds: Yup.array()
});
const userSchema = Yup.object().shape({
  fullName: Yup.string()
    .required('نام و نام خانوادگی الزامی می باشد')
    .min(6, 'نام کاربری نباید کمتر از شش کاراکتر باشد'),
  phoneNumber: Yup.string()
    .min(11, 'شماره موبایل اشتباه است توجه داشته باشید حتما با صفر شروع شود')
    .max(11, 'شماره موبایل اشتباه است توجه داشته باشید حتما با صفر شروع شود')
    .required('شماره موبایل الزامی می باشد'),
  nationalId: Yup.string()
    .min(10, 'کد ملی اشتباه است')
    .max(10, 'کد ملی اشتباه است')
    .required('کد ملی الزامی می باشد'),
  birthDate: Yup.string()
    .required('تاریخ تولد الزامی می باشد'),
  fatherName: Yup.string()
    .min(3, 'نام پدر حداقل سه کاراکتر می باشد')
    .max(12, 'نام پدر حداکثر دوازده کاراکتر می باشد')
    .required('کد ملی الزامی می باشد'),
  gender: Yup.string()
    .required('انتخاب جنسیت الزامی می باشد'),
  password: Yup.string()
    .min(4, 'کلمه عبور نباید کمتر از چهار کاراکتر باشد')
    .required('کلمه عبور الزامی می باشد'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'کلمه عبور باید تطابق داشته باشد')
});
const surveySchema = Yup.object().shape({
  text: Yup.string()
    .required('متن سوال الزامی می باشد'),
  type: Yup.string()
    .required('انتخاب نوع سوال الزامی می باشد')
});
const cancellationSchema = Yup.object().shape({
  text: Yup.string()
    .required('متن سوال الزامی می باشد'),
  type: Yup.string()
    .required('انتخاب نوع سوال الزامی می باشد')
});

module.exports = {
  adminSchema,
  categorySchema,
  subCategorySchema,
  miniSubCategorySchema,
  districtPriceSchema,
  agentSchema,
  userSchema,
  surveySchema,
  cancellationSchema
}
