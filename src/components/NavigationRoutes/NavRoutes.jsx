import React from "react";
import { Route } from "react-router-dom";
import { MainPages } from "../../container/content/Main/MainPages";
import { DetailPages } from "../../container/content/Detail/Detail";
import { FormDataPages } from "../../container/content/FormData/FormDataPages";
import { FormUpdatePages } from "../../container/content/FormUpdate/FormUpdatePages";
import { ProfilePages } from "../../container/content/Profile/ProfilePages";
import { DashboardPages } from "../../container/content/Dashboard/DashboardPages";
import { ChangePasswordPages } from "../../container/content/ChangePassword/ChangePasswordPages";

export const NavRoutes = () => {
  return (
    <>
      <Route exact path="/" component={DashboardPages} />
      <Route path="/profile" component={ProfilePages} />
      {/*  */}
      <Route path="/user/dosen" render={(props) => <MainPages {...props} />} />
      {/*  */}
      <Route path="/kepangkatan" render={(props) => <MainPages {...props} />} />
      <Route path="/pendidikan" render={(props) => <MainPages {...props} />} />
      <Route path="/penelitian" render={(props) => <MainPages {...props} />} />
      <Route path="/pengabdian" render={(props) => <MainPages {...props} />} />
      <Route path="/pengajaran" render={(props) => <MainPages {...props} />} />
      <Route path="/pelatihan" render={(props) => <MainPages {...props} />} />
      <Route path="/sertifikasi" render={(props) => <MainPages {...props} />} />
      {/* read */}
      <Route path="/detail" component={DetailPages} />
      {/* form */}
      <Route path="/add" component={FormDataPages} />
      {/* update */}
      <Route path="/update" component={FormUpdatePages} />
      {/* change password */}
      <Route path="/update-password" component={ChangePasswordPages} />
    </>
  );
};
