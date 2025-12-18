import { FC, useRef, useState } from 'react';
import { router } from '@inertiajs/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { faUser } from "@fortawesome/free-regular-svg-icons"
import Logo2 from '@/assets/logo2.PNG'

const Otpemail: FC = () => {
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
    const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
    const [timer, setTimer] = useState(60);

    useState(() => {
        const countdown = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(countdown);
    });
    const handleChange = (value: string, index: number) => {
        if (!/^[0-9]?$/.test(value)) return; // only digit

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join("");

    if (code.length < 6) {
      alert("Please enter complete OTP");
      return;
    }

    router.post("/verify-otp", { otp: code }, {
      onSuccess: () => {
        router.visit("/account/change-password"); // after success
      }
    });
  };
  const handleResend = () => {
    if (timer !== 0) return;

    setTimer(60);

    router.post("/resend-otp");
  };

  return (
    <div className='min-h-screen w-full flex flex-col bg-white'>
        <div className=' flex  items-center relative w-full h-40 md:px-10 px-5 '>
            <div onClick={() => router.visit("/account")} className=" absolute  top-1/2 -translate-y-1/2 cursor-pointer md:px-10 px-5 ">
                <FontAwesomeIcon icon={faArrowLeft} className="fa-2x cursor-pointer"/>
            </div>
            <div className='mx-auto flex flex-col pt-20 '>
                <div className='flex justify-center'>
                    <img src={Logo2} alt="Logo" className='md:w-[350px] w-[250px] mb-3' />
                </div>
                <div className='px-10'>
                    <h1 className='md:text-4xl text-3xl font-bold text-center mb-10'>Verification</h1>
                </div>
            </div>
        </div>
         <div className='flex flex-col mx-auto md:max-w-lg items-center justify-center md:mt-20 mt-6 border border-gray-300 rounded-xl px-5 py-6 w-[90%]'>
                <h1 className='text-2xl font-bold mt-10 mb-6'>OTP CODE</h1>
                <p className='text-center mt-3 mb-8'>We have sent a verification code to your email address. Please enter the code below to verify your account.</p>
                <div className='flex md:gap-3 gap-1 justify-center mb-8'>
                    {otp.map((digit, index) => (
                        <input key={index} ref={(el) => { inputsRef.current[index] = el; }} type='text' maxLength={1} value={digit} onChange={(e) => handleChange(e.target.value, index)} onKeyDown={(e) => handleKeyDown(e, index)} className='md:w-12 w-5 h-7 md:h-14 text-center border rounded-lg md:text-2xl  text-lg font-semibold focus:outline-blue-500'></input>
                    ))}
                </div>
                <button onClick={handleVerify} className="bg-[#3E3D3C] text-white px-6 py-3 rounded-xl text-lg font-semibold w-full max-w-xs">
                    Verify
                </button>
                <div className="mt-6 text-gray-500 text-sm">
                    {timer > 0 ? (
                        <span>Resend OTP in {timer}s</span>
                    ) : (
                        <button onClick={handleResend} className="text-blue-600 font-semibold mb-10">
                            Resend OTP
                        </button>
                    )}
                </div>
            </div>
       
    </div>
  );
};

export default Otpemail;