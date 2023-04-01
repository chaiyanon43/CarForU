import { Dialog } from 'primereact/dialog';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import style from '../styles/SignUp.module.css';
import { InputTextarea } from 'primereact/inputtextarea';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { Button } from 'primereact/button';
import React from 'react';
import Image from 'next/image';
import { FileUpload } from 'primereact/fileupload';
import Link from 'next/link';
import { Checkbox } from 'primereact/checkbox';
import { toaster } from 'evergreen-ui';



interface SignupFormProps {
    displayBasicSignup: boolean;
    renderFooterSignup: Function;
    setDisplayBasicSignup: Dispatch<SetStateAction<boolean>>;
}
interface userForm {
    username: string;
    password: string;
    name: string;
    image: File;
    phoneNumber: string;
    address: string;

}
const Signup = (props: SignupFormProps) => {
    const { displayBasicSignup, renderFooterSignup, setDisplayBasicSignup } = props;
    const { register, handleSubmit, getValues, setValue, resetField, formState: { errors } } = useForm<userForm>();
    const [fileName, setFileName] = useState<string>('None');
    const [display, setDisplay] = useState<boolean>(false);
    const [file, setFile] = useState();
    const [imageURL, setImageURL] = useState<string>();
    const userSubmmit: SubmitHandler<userForm> = (user) => {
        if (!user.image) {
            toaster.warning("กรุณาเพิ่มรูปภาพโปรไฟล์ และ กรอกข้อมูลให้ครบถ้วน",{duration:3})
            return
        }
        axios.post('http://localhost:8080/addUser', {
            image: user.image,
            username: user.username,
            password: user.password,
            name: user.name,
            phoneNumber: user.phoneNumber,
            address: user.address
        }, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((res: any) => {
            toaster.success(res.data,{duration:3})

        }).catch((err: any) => {
            toaster.danger('เพิ่ม User ไม่สำเร็จ',{duration:3})

        })

    }
    const hiddenFileInput = React.useRef(null);

    const handleClick = (event: any) => {
        hiddenFileInput.current!.click();
    };
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            if (event.target.files[0]) {
                setValue('image', event.target.files[0])
                setImageURL(URL.createObjectURL(event.target.files[0]))
                setFileName(event.target.files[0].name)
            }
        }
    };
    const onUploadFile = async (e: any) => {
        setFile(e.files)
        setImageURL(URL.createObjectURL(e.files[0]))
    }
    const onRemoveFile = async (e: any) => {
    }
    const [check, setCheck] = useState<any>([]);

    const onCheck = (e: any) => {
        let CheckPolicy = [...check];

        if (e.checked)
            CheckPolicy.push(e.value);
        else
            CheckPolicy.splice(CheckPolicy.indexOf(e.value), 1);

        setValue("checked", CheckPolicy);
    }

    return (<>
        <Dialog header='Policy' visible={display} onHide={() => setDisplay(false)}>
            <p>1.ข้อมูลส่วนบุคคลที่บริษัทฯมีการเก็บรวบรวม ใช้ และ/หรือเปิดเผย</p>
            <p>1.1 ชื่อ - นามสกุล</p>
            <p>1.2 เบอร์ติดต่อ</p>
            <p>1.3 ที่อยู่</p>
            <br />
            <p>2.กิจกรรมของบริษัทฯ อีกทั้งยังรวมถึงวัตถุประสงค์ หลักเกณฑ์ที่ถูกต้องตามกฎหมายในการเก็บรวบรวม การนำไปใช้ และ/หรือการเปิดเผยข้อมูลส่วนบุคคลของท่าน</p>
            <p>- หน้าที่ตามกฎหมาย</p>
            <p>1 เพื่อดำเนินการให้บริษัทฯเป็นไปตามกฎหมาย กฎเกณฑ์ และข้อบังคับใดๆ ซึ่งรวมถึงคำสั่งของศาลหรือส่วนราชการอื่นที่เกี่ยวข้องหรือสามารถบังคับใช้กับบริษัทฯได้</p>
            <p>- การปฏิบัติตามสัญญา</p>
            <p>1 เพื่อดำเนินการตามภาระผูกพันของบริษัทฯและการบังคับใช้สิทธิที่เกิดจากสัญญาใดๆที่ทำขึ้นระหว่างท่านและบริษัทฯ รวมถึงการเรียกเก็บเงิน และการเก็บเงิน</p>
            <p>2 เพื่อดำเนินการตามภาระผูกพันของบริษัทฯที่เกิดขึ้นจากกฎเกณฑ์ต่างๆที่เกี่ยวข้องทั้งหมด ซึ่งเกี่ยวข้องกับรถยนต์ของท่าน ตลอดจนที่เกี่ยวข้องกับธุรกรรมและปฏิสัมพันธ์ของท่านกับบริษัทฯ</p>
            <p>3 เพื่อดำเนินการและทำให้ธุรกรรมต่างๆของท่านเสร็จสมบูรณ์ อีกทั้งยังเพื่อมอบข้อเสนอพิเศษต่างๆ</p>
            <p>4 เพื่อแจ้งให้ท่านทราบเกี่ยวกับบัญชีผู้ใช้งานของท่าน</p>
            <p>5 เพื่อให้ความช่วยเหลือใดๆแก่ท่านด้วยทีมสนับสนุนลูกค้าของบริษัทฯ</p>
            <p>6 เพื่อให้ท่านได้สามารถเข้าร่วมโปรแกรมการโต้ตอบใดๆตามที่บริษัทฯได้นำเสนอ</p>
            <p>7 เพื่อดำเนินการในการตอบคำถามใดๆของท่าน</p>
            <p>8 เพื่อดำเนินการในการติดต่อสื่อสารกับท่านในเรื่องที่ท่านได้มีการร้องขอไว้</p>
            <p>9 เพื่อนำส่งคำถามต่างๆถึงท่านซึ่งท่านอาจจะสามารถตอบได้หากท่านได้มีการลงทะเบียนกับทางบริษัทฯไว้แล้ว หรือมีการนัดหมายไว้แล้ว ณ ที่ตั้งหรือสาขาของบริษัทฯ</p>
            <p>10 เพื่อนำส่งข้อมูลเกี่ยวกับรถยนต์ของท่าน ตามที่มีการเยี่ยมชม ณ ที่ตั้งหรือสาขาของบริษัทฯ</p>
            <p>11 เพื่อดำเนินการในการจัดกิจกรรมการแข่งขันหรือการชิงโชคต่างๆ</p>
            <p>- ประโยชน์โดยชอบด้วยกฎหมาย</p>
            <p>1 เพื่อปกป้องและปรับปรุงซึ่งเกี่ยวกับบริการต่างๆที่บริษัทฯได้นำเสนอให้แก่ท่าน</p>
            <p>2 เพื่อเพิ่มฟังก์ชั่นการทำงาน และปรับปรุงคุณภาพที่เกี่ยวกับปฏิสัมพันธ์ของท่านกับบริษัทฯ ตลอดจนเพื่อปรับแต่งประสบการณ์ของท่านในขณะที่ใช้บริการต่างๆของเรา</p>
            <p>3 เพื่อสร้างและตรวจสอบ ตลอดจนดำเนินการวิจัยรายงานต่างๆและข้อมูลที่เกี่ยวกับฐานผู้ใช้ของบริษัทฯ อีกทั้งรูปแบบต่างๆในการใช้บริการ</p>
            <p>4 เพื่อทำให้เว็บไซต์ของเราดีขึ้นและใช้งานได้ง่ายขึ้นสำหรับท่าน</p>
            <p>5 เพื่อใช้และทำซ้ำที่เกี่ยวกับโพสต์ของท่านสำหรับวัตถุประสงค์ใดๆ</p>
            <p>6 เพื่อดำเนินการนำออกไปและลบโพสต์ใดๆ หรือบางส่วนของโพสต์นั้น ซึ่งบริษัทฯเห็นว่าเป็นเท็จ ไม่ถูกต้องและบิดเบือนความจริง</p>
            <p>7 เพื่อรักษาความปลอดภัยและความเป็นระเบียบเรียบร้อยภายในบริษัทฯ</p>
            <p>8 เพื่อใช้สิทธิของบริษัทฯ และปกป้องผลประโยชน์ของบริษัทฯเมื่อจำเป็นและชอบด้วยกฎหมาย เช่น การไต่สวนความจริง การป้องกัน และการตอบสนองต่อข้อร้องเรียน</p>
            <p>9 เพื่อวัตถุประสงค์ภายในบริษัทฯ เช่น การตรวจสอบ การวิเคราะห์ข้อมูล และการวิจัยที่เกี่ยวข้องกับบริการของบริษัทฯบนเว็บไซต์ของบริษัทฯ</p>
            <p>- ความยินยอม</p>
            <p>1 เพื่อเก็บรวบรวม นำไปใช้ และ/หรือเปิดเผยข้อมูลตัวบุคคลได้ที่อ่อนไหวของท่าน</p>
            <p>2 เพื่อสำรวจข้อมูลเพื่อนำไปพัฒนาโปรโมชั่น ตลอดจนปรับปรุงผลิตภัณฑ์</p>
            <p>3 เพื่อการส่งเสริมการตลาด การวิจัย และโปรแกรมต่างๆที่จะช่วยให้เราสามารถระบุความต้องการของท่าน ตลอดจนพัฒนาโปรแกรมต่างๆและปรับปรุงประสบการณ์ของผู้ใช้งาน</p>
            <p>4 เพื่อเปิดใช้งานและกรองโฆษณาใดๆที่เกี่ยวข้องกับท่าน</p>
            <p>5 เพื่อติดต่อกับท่านผ่านช่องทางต่างๆ เช่น อีเมล์ โทรศัพท์ ไลน์ ฯลฯ เกี่ยวกับการส่งเสริมการขายของเราหรือช่องทางการสื่อสารอื่นๆ</p>
            <p>6 เพื่อมอบโอกาสให้ท่านได้รับประโยชน์จากข้อเสนอพิเศษต่างๆและบัตรกำนัลที่บุคคลภายนอกเสนอกให้แก่ท่านในฐานะลูกค้าของบริษัทฯ และ/หรือแสดงความสนใจของท่านในบริการของบริษัทฯ</p>
            <p>7 เพื่อแบ่งปันข้อมูลที่ท่านได้ให้ไว้บนเว็บไซต์ของบริษัทฯกับหุ้นส่วนที่เป็นพันธมิตรธุรกิจของเรา โดยที่พันธมิตรและหุ้นส่วนธุรกิจเหล่านี้จะมีการมอบสิทธิประโยชน์และความสะดวกแก่ท่าน ซึ่งทางบริษัทและหุ้นส่วนธุรกิจจะถือว่าท่านเป็นผู้ใช้ที่มีความสนใจและจะใช้ข้อมูลที่ท่านได้ส่งมาเพื่อติดต่อกับท่าน อีกทั้งมอบประสบการณ์ตามความต้องการจากบริการของบริษัทฯ หรือผ่านการให้บริการต่างๆบนเว็บไซต์โดยการคลิกที่ปุ่มส่ง</p>
            <p>8 เพื่อส่งหรือโอนข้อมูลส่วนบุคคลของท่านไปต่างประเทศซึ่งอาจไม่มีมาตรฐานการป้องกันข้อมูลส่วนบุคคลเพียงพอ เฉพาะในกรณีที่กฎหมายกำหนดให้บริษัทฯต้องได้รับความยินยอมจากท่าน</p>
            <br />
            <p>3.ความยินยอมของท่าน</p>
            <p>บริษัทฯขอให้ท่านอ่านคำประกาศเกี่ยวกับความเป็นส่วนตัวนี้ ตลอดจนข้อกำหนดของการใช้งานเว็บไซต์อย่างละเอียดในแต่ละส่วน ก่อนที่ท่านจะเลือกในการให้ข้อมูลส่วนบุคคลของท่านกับบริษัทฯ ซึ่งท่านตกลงด้วยว่าข้อมูลที่ท่านได้ให้นั้นชอบด้วยกฎหมาย เป็นความจริง และถูกต้อง อีกทั้งยังไม่ละเมิดกฎหมายใดๆ หรือภาระข้อผูกพันตามสัญญาใดๆที่ผูกพันท่าน ณ เวลาที่ท่านได้ให้ข้อมูล ทั้งนี้ทางบริษัทฯไม่มีความรับผิดอันใดซึ่งเกี่ยวข้องกับความน่าเชื่อถือ ความแท้จริง การบิดเบือนความจริง การฉ้อโกง ความประมาทเลินเล่อ ฯลฯ ในข้อมูลที่ท่านได้ให้ไว้ นอกจากนี้ทางบริษัทฯจะไม่รับผิดชอบในการตรวจสอบข้อมูลใดๆที่ได้รับจากท่านในทางหนึ่งทางใดก็ตาม</p>
            <br />
            <p>4.ระยะเวลาในการเก็บรักษาข้อมูลส่วนบุคคล</p>
            <p>บริษัทฯจะเก็บรักษาข้อมูลส่วนบุคคลของท่านในเซิร์ฟเวอร์ของเราตราบเท่าที่จำเป็นโดยสมควรตามวัตถุประสงค์ที่ระบุไว้ในคำประกาศเกี่ยวกับความเป็นส่วนตัวนี้ ในบางกรณี บริษัทอาจเก็บรักษาข้อมูลส่วนบุคคลของท่านไว้เป็นระยะเวลานานขึ้น เช่น เมื่อบริษัทฯจำเป็นต้องดำเนินการดังกล่าวตามข้อกำหนดต่างๆทั้งทางกฎหมาย ทางระเบียบข้อบังคับ ทางภาษี หรือแม้แต่ทางการบัญชี</p>
            <br />
            <p>ในกรณีที่ไม่จำเป็นต้องใช้ข้อมูลส่วนบุคคลของท่านแล้วอีกต่อไป บริษัทฯจะลบ ทำลาย แฝงข้อมูล (Pseudonymize) ทำข้อมูลนิรนาม (Anonymize) หรือทำให้ข้อมูลดังกล่าวของนั้นไม่สามารถระบุตัวบุคคลได้ เว้นแต่ว่าจะมีข้อผูกมัดทางกฎหมาย หรือเหตุผลทางเทคนิคที่บริษัทฯอาจเก็บรักษาข้อมูลส่วนบุคคลของท่านไว้เป็นระยะเวลานานขึ้น</p>
            <br />
            <p>5.การเปิดเผยข้อมูลส่วนบุคคล</p>
            <p>บริษัทฯมีเสรีภาพในการเปิดเผย แบ่งปัน หรือโอนถ่ายข้อมูลส่วนบุคคลของท่านทั้งหมด หรือบางส่วนไปยังผู้ให้บริการซึ่งเป็นบุคคลภายนอกที่อาจอำนวยความสะดวกในการให้บริการในนามของบริษัทฯแก่ท่าน อย่างไรก็ตามผู้ให้บริการเหล่านี้มีสิทธิเข้าถึงข้อมูลของท่านเพื่อดำเนินงานตามที่บริษัทฯกำหนดเท่านั้น ตลอดจนมีหน้าที่ไม่เปิดเผยหรือนำไปใช้เพื่อวัตถุประสงค์อื่นใด อีกทั้งทางบริษัทฯอาจแบ่งปันข้อมูลส่วนบุคคลของท่านกับผู้จัดจำหน่าย ที่ปรึกษา และผู้ให้บริการอื่นใดซึ่งเป็นบุคคลภายนอก โดยที่บุคคลเหล่านี้ทำงานให้กับบริษัทฯ และผูกพันโดยภาระข้อผูกพันตามสัญญาต่างๆที่จะเก็บข้อมูลส่วนบุคคลของท่านไว้เป็นความลับและใช้ตามวัตถุประสงค์ที่บริษัทฯได้เปิดเผย แบ่งปัน หรือโอนถ่ายไปยังพวกเขาเท่านั้น</p>
            <br />
            <p>นอกเหนือจากที่กล่าวมาข้างต้นแล้วนั้น พันธมิตรคู่ค้า และพันธมิตรช่องทางใดๆของบริษัทฯอาจเก็บรวบรวมข้อมูลส่วนบุคคลของท่านโดยได้รับความยินยอมของท่านจากอุปกรณ์เคลื่อนที่ เช่น ตำแหน่งของอุปกรณ์ ข้อมูลอุปกรณ์ (รวมถึงส่วนที่เก็บข้อมูล รุ่น โปรแกรมประยุกต์ที่ติดตั้ง WiFi เครือข่ายของโทรศัพท์เคลื่อนที่) ข้อความต่างๆทางโทรศัพท์เคลื่อนที่ในการทำธุรกรรมและการส่งเสริมการขาย ตลอดจนข้อมูลการสื่อสาร ซึ่งรวมถึงการติดต่อใดๆเพื่อมอบข้อเสนอต่างๆแล้วแต่ตามที่มีการจัดทำขึ้น</p>
            <br />
            <p>6.การโอนถ่ายข้อมูลส่วนบุคคลระหว่างประเทศ</p>
            <p>ลักษณะของการดำเนินธุรกิจสมัยใหม่มีความจำเป็นบริษัทฯในการถ่ายโอนข้อมูลส่วนบุคคลได้ของท่านไปยังต่างประเทศเพื่อการจัดเก็บ และ/หรือการประมวลผลที่เกี่ยวข้องกับวัตถุประสงค์ซึ่งได้กล่าวถึงในคำประกาศเกี่ยวกับความเป็นส่วนตัวนี้ ทั้งนี้ทางบริษัทฯจะรับรองว่าการถ่ายโอนข้อมูลส่วนบุคคลของท่านนั้นมีมาตรการรักษาความปลอดภัยที่เหมาะสม เพื่อปกป้องการถ่ายโอนข้อมูลส่วนบุคคลของท่านตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล ซึ่งรวมถึงสภาวการณ์ต่างๆ ดังต่อไปนี้</p>
            <p>1 เพื่อให้เป็นไปตามภาระข้อผูกพันทางกฎหมาย</p>
            <p>2 เพื่อขอรับความยินยอมจากท่าน และแจ้งให้ท่านทราบถึงมาตรฐานการป้องกันข้อมูลส่วนบุคคลที่ไม่เพียงพอของประเทศปลายทาง หรือองค์กรระหว่างประเทศที่ได้รับข้อมูลส่วนบุคคลของท่าน</p>
            <p>3 เพื่อดำเนินการตามข้อตกลงที่ท่านได้ทำไว้กับเรา หรือตามคำขอของท่านก่อนการเข้าทำข้อตกลง</p>
            <p>4 เพื่อให้เป็นไปตามข้อตกลงระหว่างเราและฝ่ายอื่นๆทั้งนี้เพื่อประโยชน์ของท่านเอง</p>
            <p>5 เพื่อป้องกันหรือหยุดยั้งอันตรายใดๆต่อชีวิต ร่างกาย หรือสุขภาพของท่านหรือบุคคลอื่น และท่านไม่สามารถให้ความยินยอมได้ ณ เวลาดังกล่าว</p>
            <p>6 เพื่อดำเนินกิจกรรมที่เกี่ยวข้องกับประโยชน์สาธารณะเป็นสำคัญ</p>
            <br />
            <p>7.โพสต์สาธารณะ</p>
            <p>ในฐานะที่เป็นส่วนหนึ่งในบริการต่างๆของเรา ท่านอาจมีคำวิจารณ์ คำติชม ความคิดเห็น การให้คะแนน และการลงรูปใดๆของท่าน ฯลฯ ในกลุ่มสาธารณะต่างๆ (ซึ่งรวมเรียกว่า “โพสต์”) ทั้งนี้บริษัทฯของสงวนสิทธิโดยไม่มีเงื่อนไขในการเอาออกและลบโพสต์ใดๆซึ่งในความเห็นของบริษัทฯนั้นว่าเป็นเท็จ ไม่ถูกต้องและบิดเบือนความจริง โดยโพสต์ทั้งหมดจะสามารถเข้าถึงได้แบบสาธารณะและปรากฎแก่ผู้ใช้ทุกท่าน ดังนั้นท่านจึงควรระมัดระวังในการเปิดเผยรายละเอียดที่อ่อนไหวเกี่ยวกับตัวท่านในโพสต์ต่างๆดังกล่าว นอกจากนี้บริษัทฯขอสงวนสิทธิในการใช้และทำซ้ำเกี่ยวกับโพสต์ของท่านเพื่อวัตถุประสงค์ใดๆ ทั้งนี้บริษัทฯยังอาจแบ่งปันโพสต์ของท่านกับผู้ให้บริการ องค์กรธุรกิจต่างๆ หรือบุคคลภายนอกอื่นๆ อย่างไรก็ตามหากท่านลบโพสต์ของท่านออกจากกลุ่มสาธารณะใดๆ สำเนาของโพสต์ดังกล่าวอาจยังคงสามารถดูได้ในหน้าที่ซึ่งมีการเก็บไว้แบบถาวร หรือโพสต์ดังกล่าวอาจได้รับการคัดลอกหรือจัดเก็บโดยผู้ใช้รายอื่นในกลุ่มสาธารณะนั้น</p>
            <br />
            <p>8.การใช้งานคุกกี้ (Cookie) บนเว็บไซต์ของบริษัทฯ</p>
            <p>1 คุกกี้คือไฟล์ของข้อความที่อยู่ในคอมพิวเตอร์ของท่าน ซึ่งใช้เพื่อเก็บรายละเอียดของการบันทึกการใช้งานอินเตอร์เน็ตของท่าน หรือการเยี่ยมชมเว็บไซต์ของท่าน</p>
            <p>2 บริษัทฯมีการใช้คุกกี้ประเภทต่างๆบนเว็บไซต์ ดังนี้</p>
            <p>2.1 คุกกี้ที่จำเป็นสำหรับกระบวนการดำเนินการของเว็บไซต์ (คุกกี้ที่จำเป็นอย่างมาก) เพื่อให้เว็บไซต์ทำงานได้อย่างถูกต้อง เพราะฉะนั้นจะไม่สามารถลบหรือป้องกันคุกกี้ประเภทนี้ได้</p>
            <p>2.2 คุกกี้ที่ใช้ในการวิเคราะห์และวัดประสิทธิภาพของเว็บไซต์ (คุกกี้เพื่อการวิเคราะห์ และคุกกี้เพื่อวัดประสิทธิภาพ) คุกกี้เหล่านี้ช่วยให้เราสามารถจดจำและนับจำนวนผู้เข้าชม ตลอดจนดูว่าผู้เยียมชมมีลักษณะหรือพฤติกรรมในการเยี่ยมชมและใช้งานเว็บไซต์ของเราอย่างไร กล่าวคือคุกกี้เหล่านี้ใช้เพื่อวัตถุประสงค์ในการเพิ่มประสิทธิภาพของเว็บไซต์ และเพื่อรวบรวมสถิติเกี่ยวกับวิธีการที่ผู้เยี่ยมชมเข้าถึงและเรียกดูเว็บไซต์ของเราอย่างไร</p>
            <p>2.3 คุกกี้ที่ใช้เพื่อช่วยจดจำข้อมูลการตั้งค่าหรือตัวเลือกที่ท่านทำบนเว็บไซต์ของบริษัทฯ (คุกกี้เพื่อฟังก์ชั่นการทำงาน) คุกกี้เหล่านี้ใช้เพื่อช่วยให้เราปรับแต่งเนื้อหาของเราให้เหมาะกับท่าน และปรับเว็บไซต์ให้เหมาะกับความต้องการของท่าน ตลอดจนจดจำการตั้งค่าของท่าน เช่น ภาษาที่ท่านเลือก หรือขนาดตัวอักษรในการเรียกดู</p>
            <p>2.4 คุกกี้สำหรับการโฆษณา (คุกกี้เพื่อการโฆษณา) คุกกี้เหล่านี้จะจดจำการตั้งค่าของท่านที่ท่านใช้บนเว็บไซต์เพื่อปรับแต่งโฆษณาให้เหมาะกับท่าน ตลอดจนที่เกี่ยวข้องกับท่าน</p>
            <p>3 การจัดการกับคุกกี้</p>
            <br />
            <p>โดยปกติแล้ว ท่านสามารถเลือกที่จะตั้งค่าการเรียกดูของท่านเพื่อที่จะลบและปฏิเสธคุกกี้เหล่านี้ได้ ยกเว้นคุกกี้ที่ใช้เพื่อวัตถุประสงค์ในการดำเนินงานต่างๆตามระบบของเว็บไซต์ ซึ่งหากท่านเลือกที่จะลบหรือปฏิเสธคุกกี้เทล่านี้ ดังนั้นแล้วการดำเนินการนี้อาจส่งผลกระทบต่อคุณลักษณะบางประการของเว็บไซต์ และ/หรือโปรแกรมประยุกต์เคลื่อนที่ของบริษัทฯ</p>
            <br />
            <p>9.สิทธิของท่าน</p>
            <p>ท่านมีสิทธิในข้อมูลส่วนบุคคลของท่านภายใต้พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล และบริษัทฯจะเคารพสิทธิของท่านโดยการดำเนินการตามกฎหมาย กฎเกณฑ์ หรือ ข้องบังคับต่างๆที่เกี่ยวข้องกับการประมวลผลของข้อมูลส่วนบุคคลของท่าน ทั้งนี้ท่านอาจใช้สิทธิต่อไปนี้ในฐานะของเจ้าของข้อมูล เว้นแต่บริษัทฯจะมีเหตุที่จะปฏิเสธคำขอของท่านโดยชอบด้วยกฎหมาย</p>
            <p>1 สิทธิในการเพิกถอนความยินยอม ซึ่งท่านมีสิทธิในการเพิกถอนความยินยอมของท่าน โดยการเพิกถอนความยินยอมจะไม่กระทบต่อความถูกต้องตามกฎหมายของการเก็บรวบรวม การนำไปใช้ และ/หรือการเปิดเผยข้อมูลที่ระบุตัวบุคคลได้ของท่านก่อนที่จะได้รับการเพิกถอน</p>
            <p>2 สิทธิในการเข้าถึงและได้รับสำเนา ซึ่งท่านมีสิทธิในการเข้าถึงและได้รับสำเนาเกี่ยวกับข้อมูลส่วนบุคคลของท่านที่ บริษัทฯได้มีการเก็บรักษาไว้</p>
            <p>3 สิทธิในการโอนถ่ายข้อมูล ซึ่งท่านมีสิทธิในการได้รับข้อมูลส่วนบุคคลของท่าน โดยที่บริษัทฯสามารถดำเนินการเกี่ยวกับข้อมูลส่วนบุคคลดังกล่าวให้อยู่ในรูปแบบที่สามารถอ่านได้และที่มีการใช้กันทั่วไป โดยเครื่องมือ หรืออุปกรณ์อัตโนมัติ หรือการจัดรูปแบบข้อมูลทางคอมพิวเตอร์ ซึ่งข้อมูลดังกล่าวสามารถมีการนำไปใช้ หรือได้รับการเปิดเผยโดยวิธีการหรืออุปกรณ์อัตโนมัติใดๆ นอกจากนี้ ท่านมีสิทธิที่จะขอให้ทางบริษัทฯส่งหรือโอนถ่ายข้อมูลส่วนบุคคลของท่านไปยังบุคคลภายนอก หรือรับข้อมูลส่วนบุคคลของท่านซึ่งบริษัทฯได้มีการส่งหรือโอนถ่ายไปยังบุคคลภายนอก</p>
            <p>4 สิทธิในการคัดค้าน ซึ่งท่านมีสิทธิในการคัดค้านการเก็บรวบรวม การนำไปใช้ และ/หรือการเปิดเผยข้อมูลส่วนบุคคลของท่าน โดยที่บริษัทฯดำเนินการตามฐานผลประโยชน์ที่ชอบด้วยกฎหมาย หรือเพื่อวัตถุประสงค์ทางการตลาดแบบตรง หรือเพื่อวัตถุประสงค์เกี่ยวกับการศึกษาวิจัยทางวิทยาศาสตร์ ประวัติศาสตร์ หรือสถิติ</p>
            <p>5 สิทธิในการลบ ซึ่งท่านมีสิทธิที่จะขอให้บริษัทฯลบ ทำลาย หรือทำให้ไม่สามารถระบุตัวตนได้ของข้อมูลที่ส่วนบุคคล ในกรณีที่บริษัทฯไม่มีความจำเป็นหรือไม่มีสิทธิตามกฎหมายที่จะเก็บข้อมูลส่วนบุคคลดังกล่าวได้</p>
            <p>6 สิทธิในการระงับ ซึ่งท่านมีสิทธิที่จะขอให้บริษัทฯระงับการใช้ข้อมูลส่วนบุคคลของท่านภายใต้สภาวการณ์บางอย่างเมื่อมีกระบวนการตรวจสอบที่รอดำเนินการของบริษัทฯตามคำขอของท่านในการแก้ไขข้อมูลส่วนบุคคลของท่าน หรือคัดค้านการเก็บรวบรวม การนำไปใช้ และ/หรือการเปิดเผยข้อมูลส่วนบุคคลของท่าน หรือคำขอของท่านในการจำกัดการใช้ข้อมูลส่วนบุคคลของท่านแทนการลบหรือทำลายข้อมูลส่วนบุคคลของท่าน</p>
            <p>7 สิทธิในการแก้ไข ซึ่งท่านมีสิทธิที่จะขอให้แก้ไขข้อมูลส่วนบุคคลของท่านที่ไม่ถูกต้อง และทำข้อมูลส่วนบุคคลของท่านให้เป็นปัจจุบันเพื่อไม่ให้เกิดความเข้าใจผิดใดๆ</p>
            <p>8 สิทธิในการยื่นคำร้อง ซึ่งท่านมีสิทธิที่จะร้องเรียนกับคณะกรรมการคุ้มครองข้อมูลส่วนบุคคล หรือสำนักงานของคณะกรรมการดังกล่าว เมื่อบริษัทฯไม่ปฏิบัติตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล</p>
            <br />
            <p>10.การเปลี่ยนแปลงของคำประกาศเกี่ยวกับความเป็นส่วนตัว</p>
            <p>บริษัทฯขอสงวนสิทธิในการแก้ไขหรือเปลี่ยนแปลงคำประกาศเกี่ยวกับความเป็นส่วนตัวนี้ได้ทุกเมื่อตามความจำเป็น หากบริษัทฯตัดสินใจเปลี่ยนแปลงคำประกาศเกี่ยวกับความเป็นส่วนตัวนี้ บริษัทฯจะโพสต์ฉบับปรับปรุงในหน้านี้ และ/หรืออัปเดตวันที่ที่มีการแก้ไขด้านล่าง เราขอให้ท่านตรวจสอบคำประกาศเกี่ยวกับความเป็นส่วนตัวนี้เป็นครั้งคราว เพื่อให้ท่านอัปเดตเกี่ยวกับการเปลี่ยนแปลงที่เกิดขึ้น การใช้บริการที่ต่อเนื่องของท่านในบริการต่างของบริษัทฯหลังจากที่มีการเปลี่ยนแปลงใดๆจะถือว่าท่านยอมรับการเปลี่ยนแปลงดังกล่าว</p>
        </Dialog>
        <div className={style['signup-container']}>
            <div className={style['signup-box']}>
                <form onSubmit={handleSubmit(userSubmmit)} encType='multipart/form-data'>
                    <div>
                        <div className={style["profile-image"]}>
                            <i className='pi pi-user' >
                                {getValues('image') && <img src={imageURL} />}
                                <i className='pi pi-times-circle' onClick={(e) => {
                                    setImageURL('')
                                    setFileName('')
                                    setFile(undefined)
                                    setValue('image', undefined)
                                }} ></i>
                            </i>
                            <label style={{ color: "#FEFEFE" }}>Choose file: <span><input className={style['input-file-name']} value={fileName} disabled></input></span></label>
                            <button type='button' onClick={handleClick}>Upload a file</button>
                            <input type='file' ref={hiddenFileInput}
                                onChange={handleChange} id={style["file-input"]} />
                        </div>
                        <div className={style['sigup-inside']}>
                            <label>Username</label>
                            <InputText placeholder='Username' {...register("username")} />
                        </div>
                        <div className={style['sigup-inside']}>
                            <label >Password</label>
                            <Password placeholder='Password' feedback={false} onChange={(e) => setValue('password', e.target.value)} />
                        </div>
                        <div className={style['sigup-inside']}>
                            <label >Confirm Password</label>
                            <Password placeholder='Confirm Password' toggleMask feedback={false} />
                        </div>
                        <div className={style['sigup-inside']}>
                            <label >Name</label>
                            <InputText placeholder='Name' {...register("name")} />
                        </div>
                        <div className={style['sigup-inside']}>
                            <label >Phone Number</label>
                            <InputText placeholder='Phone Number' {...register("phoneNumber")} />
                        </div>
                        <div className={style['sigup-inside']}>
                            <label >Address</label>
                            <InputTextarea autoResize placeholder='Address' rows={5} {...register("address")} />
                        </div>
                        <div className={style['sigup-btn-container']}>
                            <div className={style['btn-inside']}>
                                <label className={style['policy_text']}>คุณรับทราบ</label>
                                <label className={style['policy']} onClick={()=>setDisplay(true)}>Policy</label>
                                <Checkbox className={style['policy_check']} value="check" onChange={onCheck}></Checkbox>                                <Button type='button' id={style['cancel']}>
                                    <Link style={{ textDecoration: "none", color: "#FEFEFE" }} href={'/login'}>
                                        Cancel
                                    </Link></Button>
                                <Button type='submit'>Sign Up</Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div >
        <label onClick={()=>setDisplay(true)}>Policy</label>
    </>)
}
export default Signup