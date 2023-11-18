import Header from "@/components/Header";
import SplitWithImage from "@/components/template/Feature";
import ArticleList from "@/components/template/Blog";
import SmallCentered from "@/components/template/Footer";
import ThreeTierPricingHorizontal from "@/components/template/Pricing";

export default function Example() {
  return (
    <>
      <Header displayLoginButton={false} isTopPage={true}/>
      <SplitWithImage/>
      <ThreeTierPricingHorizontal/>
      <ArticleList/>
      <SmallCentered/>
    </>
  )
}
