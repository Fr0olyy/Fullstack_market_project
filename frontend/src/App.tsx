import { Header } from './components/header/Header'
import { Promo_slider } from './components/promoSlider/Promo_slider'
import ProductsGrid from './components/productsGrid/ProductsGrid'
export function App() {

  return (
    <>
      <Header />
      <Promo_slider />
      <div className="app">
        <ProductsGrid />
      </div>
    </>
  )
}


