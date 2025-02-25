"use client";

import React, { useState, useEffect } from "react";
import {useTeachers} from "@/hooks/useTeachers";
import Header from "../../components/layout/header";
import Breadcrumb from "../../components/teacher/breadcrumb";
import Filter from "../../components/teacher/Filter";
import TeacherCard from "../../components/teacher/teacherCard";
import styles from "./list.module.css";
import Page from "../../course/_components/list/pagination";
import style from "../../pages/menu.module.css";
import style1 from "../../product/list/list.module.css";

export default function App (){
  const { teachers = [] } = useTeachers();

  // 分頁
  const [page, setPage] = useState(1);
  const perPage = 9;
  const totalPages =  Math.max(1, Math.ceil((teachers?.length || 0) / perPage));

  const startIndex = (page - 1) * perPage;
  const currentCourses = teachers?.slice(startIndex, startIndex + perPage);

  // if (loading) return
  //     <>
  //         <div className={style.container2}>
  //             <div className={style.loader27}></div>
  //            </div>
  //          </>

  return (
    <>
      <Header />
      <div className="lumi-all-wrapper">
        <div className={styles.container}>
          <section className={style1.DmArea}>
            <a href="">
              <figure>
                <img src="/product/DM/DM_7.png" alt="" />
              </figure>
            </a>
          </section>
          <section className={style1.BreadcrumbsTitle}>
            <Breadcrumb
              links={[
                { label: "首頁 ", href: "/" },
                { label: " 師資服務", href: "/teacher" },
                {
                  label: " 師資列表",
                  href: "/teacher/list",
                  active: true,
                },
              ]}
            />
            <div className={`mt-4 ${style1.Title}`}>
              <h3 className={style1.list}>師資列表</h3>
              <div className={style1.TitleFilter}>
                <img src="/product/font/filter.png" alt="" />
                <h6>依熱門排序</h6>
              </div>
            </div>
          </section>
          <section className={styles.pdArea}>
            <div className="row">
              <div className={`col-3 ${styles.asideContainer}`}>
                <Filter />
                {/* <div>
                <section className={styles.breadcrumbsTitle}>
                  <div className={styles.teaTitle}>
                    <h4 className={styles.list}>師資列表</h4>
                    <div className={styles.titleFilter}>
                      <img src="./img/font/filter.png" alt="" />
                      <h6>依熱門排序</h6>
                    </div>
                  </div>
                </section>
                <div> */}
              </div>
              <div className="col-9">
                <div className="row mt-1 g-5 mb-5">
                  {/* {Array.isArray(teachers) &&
                    teachers.map((teacher) => (
                      <TeacherCard
                        key={teacher.id}
                        imgSrc={`/teacher-img/${teacher.img}`}
                        col="col-6 col-md-4"
                        name={teacher.name}
                        text={teacher.category_name}
                        link={`/teacher/info/${teacher.id}`}
                      />
                    ))}
                </div>
                <div className={styles.courseGroup}> */}
                {currentCourses?.map((teacher) => {
                    return(
                    <TeacherCard key={teacher.id} imgSrc={`/teacher-img/${teacher.img}`}
                    col="col-6 col-md-4"
                    name={teacher.name}
                    text={teacher.category_name}
                    link={`/teacher/info/${teacher.id}`}/>
                    )
                })}
            </div>
                <Page
                  totalPages={totalPages} currPage={page} setCurrPage={setPage}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
