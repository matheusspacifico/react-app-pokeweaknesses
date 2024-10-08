import { useState } from "react";
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
    const [hoverRow, setHoverRow] = useState(null);
    const [hoverColumn, setHoverColumn] = useState(null);

    function effectivenessDisplay(value){
        if (value === 0) return "0";
        if (value === 0.5) return "½";
        if (value === 2) return "2";
        return "";
    }
    
    function getEffectivenessText(value){
        if (value === 0) {
            return <strong>Immune.</strong>;
        }
        if (value === 0.5) {
            return <strong>Not very effective...</strong>;
        }
        if (value === 2) {
            return <strong>Very effective!</strong>;
        }
        return;
    }

    function getEffectivenessColor(value){
        if (value === 0) {
            return "cell-immune";
        }
        if (value === 0.5) {
            return "cell-red";
        }
        if (value === 2) {
            return "cell-green";
        }
        return "";
    }

    function handleMouseHover(rowHeaderAttacker, defender, value, row, column){
        setHoverCell({rowHeaderAttacker, defender, value});
        setHoverRow(row);
        setHoverColumn(column);
    }
    
    function handleMouseLeave(){
        setHoverCell(null);
        setHoverRow(null);
        setHoverColumn(null);
    }

    let infoPanel;
    if (hoverCell) {
        infoPanel = (
            <>
                <h3>Interaction</h3>
                <p>
                    <img src={`./static/${hoverCell.rowHeaderAttacker}.png`} alt={`${hoverCell.rowHeaderAttacker} type defender`}></img> attacking <img src={`./static/${hoverCell.defender}.png`} alt={`${hoverCell.defender} type defender`}></img>
                </p>
                <p>
                    {getEffectivenessText(hoverCell.value)}
                </p>
            </>
        );
    } else {
        infoPanel = <p>Hover your mouse over the type chart</p>;
    }

    return (
        <section className="type-chart-container">

            <article className="type-chart">
                <div></div>
                {/* the div above is the empty grid between the rows and columns headers */}

                {types.map((columnHeaderDefender, index) => (
                    <div key={index} className="type-header defender-header">
                        <img
                            className="type-icon"
                            src={`./static/${columnHeaderDefender}.png`}
                            alt={`${columnHeaderDefender} type defender`}
                        ></img>
                    </div>
                ))}

                {types.map((rowHeaderAttacker, row) => (
                    <div key={row} className="type-row">
                        <div className="type-header attacker-header">
                            <img
                                className="type-icon"
                                src={`./static/${rowHeaderAttacker}.png`}
                                alt={`${rowHeaderAttacker} type attacker`}
                            ></img>
                        </div>
                        
                        {types.map((defender, column) => (
                            <div
                                key={column}
                                className={`cell 
                                    ${hoverRow === row || hoverColumn === column ? "highlight" : ""}
                                    ${getEffectivenessColor(effectiveness[row][column])}
                                    `}
                                onMouseEnter={() => handleMouseHover(rowHeaderAttacker, defender, effectiveness[row][column], row, column)}
                                onMouseLeave={handleMouseLeave}
                            >{effectivenessDisplay(effectiveness[row][column])}</div>
                        ))}
                    </div>
                ))}
            </article>

            <article className="info-chart">
                {infoPanel}
            </article>

        </section>
    );

}

export default TypeChart;