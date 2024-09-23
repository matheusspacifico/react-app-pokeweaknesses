import React, { useState } from "react";
import "./TypeChart.css";

const types = [
    "Normal", "Fire", "Water", "Grass", "Electric", "Ice", "Fightning", "Poison",
    "Ground", "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dragon", "Dark", "Steel", "Fairy"
];

const effectiveness = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0, 1, 1, 0.5, 1], // Normal
    [1, 0.5, 0.5, 2, 1, 2, 1, 1, 1, 1, 1, 2, 0.5, 1, 0.5, 1, 2, 1], // Fire
    [1, 2, 0.5, 0.5, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 0.5, 1, 1, 1], // Water
    [1, 0.5, 2, 0.5, 1, 1, 1, 0.5, 2, 0.5, 1, 0.5, 2, 1, 0.5, 1, 0.5, 1], // Grass
    [1, 1, 2, 0.5, 0.5, 1, 1, 1, 0, 2, 1, 1, 1, 1, 0.5, 1, 0.5, 1], // Electric
    [1, 0.5, 0.5, 2, 1, 0.5, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1, 0.5, 1], // Ice
    [2, 1, 1, 1, 1, 2, 1, 0.5, 1, 0.5, 0.5, 0.5, 2, 0, 1, 2, 2, 0.5], // Fighting
    [1, 1, 1, 2, 1, 1, 1, 0.5, 0.5, 1, 1, 1, 0.5, 0.5, 1, 1, 0, 2], // Poison
    [1, 2, 1, 0.5, 2, 1, 1, 2, 1, 0, 1, 0.5, 2, 1, 1, 1, 2, 1], // Ground
    [1, 1, 1, 2, 0.5, 1, 2, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 0.5, 1], // Flying
    [1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 0.5, 1, 1, 1, 1, 0, 0.5, 1], // Psychic
    [1, 0.5, 1, 2, 1, 1, 0.5, 0.5, 1, 0.5, 2, 1, 1, 0.5, 1, 1, 0.5, 0.5], // Bug
    [1, 2, 1, 1, 1, 2, 0.5, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 0.5, 1], // Rock
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 0.5, 1], // Ghost
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0.5, 0], // Dragon
    [1, 1, 1, 1, 1, 1, 0.5, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 1, 0.5], // Dark
    [1, 0.5, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0.5, 2], // Steel
    [1, 0.5, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 1, 1, 1, 2, 2, 0.5, 1], // Fairy
];

function TypeChart(){    
    const [hoverCell, setHoverCell] = useState(null);

    function effectivenessDisplay(value){
        if (value === 0) return "0";
        if (value === 0.5) return "½";
        if (value === 2) return "2";
        return "";
    }
    
    function handleMouseHover(attacker, defender, value){
        setHoverCell({attacker, defender, value});
    }
    
    function handleMouseLeave(){
        setHoverCell(null);
    }

    let infoPanel;
    if (hoverCell) {
        infoPanel = (
            <>
                <h3>Interaction</h3>
                <p>
                    <strong>{hoverCell.attacker}</strong> vs <strong>{hoverCell.defender}</strong>
                </p>
                <p>
                    Effectiveness: <strong>{effectivenessDisplay(hoverCell.value)}</strong>
                </p>
            </>
        );
    } else {
        infoPanel = <p>Hover your mouse over the type chart</p>;
    }

    return (
        <section className="type-chart-container">

            <article className="type-chart">
                <div className="header"></div>
                {types.map((types, index) => (
                    <div key={index} className="header type-header">{types}</div>
                ))}

                {types.map((attacker, row) => (
                    <React.Fragment key={row}>
                        <div className="header type-header">{attacker}</div>
                        {types.map((defender, column) => (
                            <div
                                key={column}
                                className="cell"
                                onMouseEnter={() => handleMouseHover(attacker, defender, effectiveness[row][column])}
                                onMouseLeave={handleMouseLeave}
                            >{effectivenessDisplay(effectiveness[row][column])}</div>
                        ))}
                    </React.Fragment>
                ))}
            </article>

            <article className="info-chart">
                {infoPanel}
            </article>

        </section>
    );

}

export default TypeChart;