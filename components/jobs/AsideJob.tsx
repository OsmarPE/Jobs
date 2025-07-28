import { Briefcase, CreditCard, Map } from 'lucide-react'
import React from 'react'
import { Checkbox } from '../ui/checkbox'

export default function AsideJob() {
    return (
        <aside className="jobs__aside">
            <div className="jobs__aside-section">
                <h2 className="jobs__aside-title">
                    <Map />
                    Lenguajes
                </h2>
                <ul className="jobs__aside-list">
                    <li className="jobs__aside-item">
                        <Checkbox name="language" id="web-dev" value="web-dev" />
                        <label htmlFor="web-dev">Mexico</label>
                    </li>
                    <li className="jobs__aside-item">
                        <Checkbox name="language" id="web-dev" value="web-dev" />
                        <label htmlFor="web-dev">Ingles</label>
                    </li>
                    <li className="jobs__aside-item">
                        <Checkbox name="language" id="web-dev" value="web-dev" />
                        <label htmlFor="web-dev">Frances</label>
                    </li>
                    <li className="jobs__aside-item">
                        <Checkbox name="language" id="web-dev" value="web-dev" />
                        <label htmlFor="web-dev">Argentina</label>
                    </li>
                </ul>
            </div>
            <div className="jobs__aside-section">
                <h2 className="jobs__aside-title">
                    <Briefcase />
                    Tipo de trabajo
                </h2>
                <ul className="jobs__aside-list">
                    <li className="jobs__aside-item">
                        <Checkbox name="language" id="web-dev" value="web-dev" />
                        <label htmlFor="web-dev">Presencial</label>
                    </li>
                    <li className="jobs__aside-item">
                        <Checkbox name="language" id="web-dev" value="web-dev" />
                        <label htmlFor="web-dev">En linea</label>
                    </li>
                </ul>
            </div>
            <div className="jobs__aside-section">
                <h2 className="jobs__aside-title">
                    <CreditCard />
                    Rango Salarial
                </h2>
                <div className="jobs__range"></div>
                <div className="price-labels">
                    <span className="price-label" id="min-price">$1,000</span>
                    <span className="price-label" id="max-price">$20,000</span>
                </div>
            </div>

        </aside>
    )
}
