import React from "react";
import Footer from "../components/home/Footer";
import Header from "../components/home/Header";
import Home from "../components/home/Home";
import Wrapper from "../components/common/Wrapper/Wrapper";
import Logo from "../assets/icons/logo.svg?react";
import {
  HeaderLogoTitle,
  HeroSection,
  HeroTitle,
  HeroBody,
} from "../components/home/styles";
import OnboardingForm from "../components/home/OnboardingForm";
import { useDispatch } from "react-redux";
import { getAuthToken, signUp } from "../store/auth-actions";

export default function HomeContainer({ onSignup, onSignin }) {
  return (
    <Home>
      <Header>
        <Wrapper alignItems="center" padding="0 1em">
          <Logo />
          <HeaderLogoTitle>Kanban</HeaderLogoTitle>
        </Wrapper>
        <Wrapper justify="space-between" minHeight="600px">
          <HeroSection direction="column">
            <HeroTitle>Advanced Kanban Board.</HeroTitle>
            <HeroBody>Streamline Your Workflow, Maximize Productivity</HeroBody>
          </HeroSection>
          <OnboardingForm onSignup={onSignup} onSignin={onSignin} />
        </Wrapper>
      </Header>
      <Footer />
    </Home>
  );
}
