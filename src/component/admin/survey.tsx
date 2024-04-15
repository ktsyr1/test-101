"use client"
import { Table, Popconfirm, message } from "antd";
import { useMutation } from "@apollo/client";
import { Surveys_Delete } from "@/graphql/queries/surveies"; // تأكد من استيراد الاستعلام الصحيح
import Icon from "@/component/icons";
import { useState } from "react";

export default function AdminSurveysList({ data: All }: any) {
    const [deleteSurvey, { data: delData, loading, error }] = useMutation(Surveys_Delete);
    let [data, setData] = useState(All);

    function handleDelete(id: any) {
        console.log(id);
        
        deleteSurvey({ variables: { id } })
            .then(response => {
                console.log(response);
                
                let filter = data.filter((survey: any) => survey.id !== id);
                setData(filter);
                message.success('تم حذف الاستبيان');
            })
            .catch(error => message.error('حدث خطأ أثناء حذف الاستبيان:', error));
    }

    const columns = [
        { title: "الاسم الكامل", dataIndex: "fullName", key: "fullName" },
        { title: "العمر", dataIndex: "age", key: "age" },
        { title: "الوظيفة", dataIndex: "occupation", key: "occupation" },
        { title: "المدينة", dataIndex: "city", key: "city" },
        { title: "الجنس", dataIndex: "gender", key: "gender" },
        { title: "نوع المستخدم", dataIndex: "typeUser", key: "typeUser" },
        // { title: "قنوات الوصول", dataIndex: "accessChannels", key: "accessChannels" },
        // { title: "التصميم العام", dataIndex: "generalLayout", key: "generalLayout" },
        // { title: "المعلومات الموجودة", dataIndex: "informationFound", key: "informationFound" },
        // { title: "المشكلة", dataIndex: "problem", key: "problem" },
        // { title: "الاقتراح", dataIndex: "suggest", key: "suggest" },
        {
            title: "الخيارات",
            dataIndex: "delete",
            key: "delete",
            render: (_: any, record: any) => (
                <Popconfirm title="هل أنت متأكد من حذف الاستبيان؟" okText="نعم" cancelText="لا" onConfirm={() => handleDelete(record.id)}>
                    <button className="mr-10 green ml-10 box aitem">
                        <Icon.delete />
                    </button>
                </Popconfirm>
            )
        }
    ];

    return (
        <div className="m-4 p-4 bg-slate-50 rounded-2xl pr-8">
            <Table dataSource={data} columns={columns} pagination={false} className="flex flex-col items-center *:w-full my-8" rowKey={(record) => record.id.toString()} />
        </div>
    );
}
