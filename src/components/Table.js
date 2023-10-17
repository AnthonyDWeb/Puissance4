import React from 'react'
import table from './Table.module.css'
import Button from './Button';

class Table extends React.Component {
    power4 = {
        col1: [0, 0, 0, 0, 0, 0],
        col2: [0, 0, 0, 0, 0, 0],
        col3: [0, 0, 0, 0, 0, 0],
        col4: [0, 0, 0, 0, 0, 0],
        col5: [0, 0, 0, 0, 0, 0],
        col6: [0, 0, 0, 0, 0, 0],
        col7: [0, 0, 0, 0, 0, 0],
    };

    constructor() {
        super();

        this.state = { ...this.power4, player: true, };
    }

    componentDidUpdate() {
        this.victoryCondition();
    }

    onClickColumn = (nbColumn) => {
        for (let i = 0; i < this.state[nbColumn].length; i++) {
            if (this.state[nbColumn][i] === 0) {
                const colCopy = [...this.state[nbColumn]]
                this.state.player ? (colCopy.splice(i, 1, "Rouge")) : (colCopy.splice(i, 1, "Jaune"))
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        [nbColumn]: [...colCopy],
                        player: !this.state.player
                    }
                })
                break;
            }
        }
    }

    victoryCondition = () => {
        for (let i = 1; i <= 7; i++) {
            let table = this.state["col" + i];
            for (let j = 0; j <= table.length; j++) {
                if (table[j]) {
                    const condition1 = (table[j + 1] === table[j] && table[j + 2] === table[j] && table[j + 3] === table[j]);

                    const condition2 = (this.state["col" + (i + 1)]?.[j] === table[j] &&
                        this.state["col" + (i + 2)]?.[j] === table[j] &&
                        this.state["col" + (i + 3)]?.[j] === table[j]);

                    const condition3 = (this.state["col" + (i + 1)]?.[j + 1] === table[j] &&
                        this.state["col" + (i + 2)]?.[j + 2] === table[j] &&
                        this.state["col" + (i + 3)]?.[j + 3] === table[j]);

                    const condition4 = (this.state["col" + (i - 1)]?.[j + 1] === table[j] &&
                        this.state["col" + (i - 2)]?.[j + 2] === table[j] &&
                        this.state["col" + (i - 3)]?.[j + 3] === table[j]);

                    if (condition1 || condition2 || condition3 || condition4) {
                        const dialog = document.querySelector("dialog");
                        const message = document.getElementById("dialogMessage");
                        message.innerText = `${table[j]} à gagné la partie !`;
                        dialog.showModal();
                    }
                }
            }
        }
    }

    tableRow = (lin) => {
        const colArr = [1, 2, 3, 4, 5, 6, 7];
        return (
            <tr className={table.tr}>
                {colArr.map(e => <Button onClick={() => this.onClickColumn(`col${e}`)} class={this.state[`col${e}`][lin]} />)}
            </tr>
        )
    }

    reset = () => {
        this.setState({
            ...this.power4,
            player: true,
        })
    }

    render() {
        return (
            <>
                <table className={table.table} >
                    <tbody>
                        {this.tableRow(5)}
                        {this.tableRow(4)}
                        {this.tableRow(3)}
                        {this.tableRow(2)}
                        {this.tableRow(1)}
                        {this.tableRow(0)}
                    </tbody>
                    <dialog id='dialog' className={table.dialog}>
                        <div>
                            <p id='dialogMessage'></p>
                            <form method="dialog">
                                <button className={table.dialogBtn} onClick={() => this.reset()}>OK</button>
                            </form>
                        </div>
                    </dialog>
                </table >
                <button className={table.resetBtn}>Réinitialiser</button>
            </>
        )
    }
}

export default Table;