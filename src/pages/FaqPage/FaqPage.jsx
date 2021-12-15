import React from "react";
import MainLayout from "../../layouts/MainLayout";
import EmptyState from "../../domain/EmptyState";
import "./FaqPage.scss";

const FaqPage = (props) => {

  return (
    <MainLayout title="FAQ">
      <EmptyState
        title="FAQ"
        description="Данная страница находиться в разработке"
        imgName="under_construction" />
    </MainLayout>
  );
};

export default FaqPage;
