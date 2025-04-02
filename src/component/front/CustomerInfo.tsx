import { useForm, UseFormRegister,FieldValues,RegisterOptions,FieldErrors } from "react-hook-form";
import { apiService } from "../../apiService/apiService";
import { registerRules } from '../../data/data';
import {FormValues} from '../../type/RegisterRulesType'
const APIPath = import.meta.env.VITE_API_PATH;
import { useToast } from "../../hook";
import { Link } from "react-router-dom";
interface InputPropsType{
  label:string, 
  id:keyof FormValues, 
  type:string, 
  placeholder:string, 
  register:UseFormRegister<FormValues>;
  rules?:RegisterOptions<FormValues, keyof FormValues>, 
  errors:FieldErrors<FormValues>
}
interface CustomerInfoType{
  setIsLoading:React.Dispatch<React.SetStateAction<boolean>>, 
  setReload:React.Dispatch<React.SetStateAction<boolean>>
}
interface UserInfoType{
  data:{
    user: Omit<FormValues, "message">; // 使用 FormValues，但去掉 message
    message: string; // 單獨保留 message 屬性
  }
}
const Input = (props:InputPropsType) => {
  const { label, id,  type, placeholder, register, rules, errors } = props;
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        id={id}
        type={type}
        className={`form-control ${errors[id] && "is-invalid"}`}
        placeholder={placeholder}
        {...register(id, rules)}
      />
      {errors[id] && <p className="text-danger my-2">{errors[id]?.message}</p>}
    </div>
  );
};
const CustomerInfo = (props:CustomerInfoType) => {
  const { setIsLoading, setReload } = props;
  const updateToast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      tel: "",
      address: "",
      message:''
    },
    mode: "onTouched",
  });

  const onSubmit = handleSubmit((data:FormValues) => {
    const { message, ...user } = data;
    const userInfo:UserInfoType = {
      data: {
        user,
        message,
      },
    }
    checkOrder(userInfo);
  });
  const checkOrder = async (userInfo:UserInfoType) => {
    setIsLoading(true);
    try {
      await apiService.axiosPost(`/api/${APIPath}/order`, userInfo);
      reset();
      updateToast("填寫完成", "danger", true);
    } catch (error) {
      console.log(error);
      alert(error);
      updateToast("填寫失敗", "danger", true);
    } finally {
      setIsLoading(false);
      setReload(true);
    }
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <Input
          label="收件人姓名"
          id="name"
          type="text"
          placeholder="請輸入姓名"
          register={register}
          rules={registerRules.name}
          errors={errors}
        />
        <Input
          label="Email"
          id="email"
          type="email"
          placeholder="請輸入 Email"
          register={register}
          rules={registerRules.email}
          errors={errors}
        />
        <Input
          label="收件人電話"
          id="tel"
          type="tel"
          placeholder="請輸入電話"
          register={register}
          rules={registerRules.tel}
          errors={errors}
        />
        <Input
          label="收件人地址"
          id="address"
          type="text"
          placeholder="請輸入地址"
          register={register}
          rules={registerRules.address}
          errors={errors}
        />
        <div className="mb-3">
          <label htmlFor="message" className="text-muted mb-0">
            備註
          </label>
          <textarea
            className="form-control"
            rows={3}
            cols={20}
            id="message"
            placeholder="留言 ... "
            {...register("message")}
          ></textarea>
        </div>
        <div className="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center align-items-end w-100">
          <Link to="/cart" className="text-dark mt-md-0 mt-3 fw-bold">
            <i className="fas fa-chevron-left me-2"></i>回到購物車
          </Link>
          <button
            type="submit"
            className="btn btn-dark py-3 px-5"
            disabled={!isValid}
          >
            建立訂單
          </button>
        </div>
      </form>
    </>
  );
};

export default CustomerInfo;
