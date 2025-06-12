import styles from "./pagination.module.css";
import { TbPizza } from "react-icons/tb";
import { BiMoviePlay } from "react-icons/bi";
import { LuCarTaxiFront } from "react-icons/lu";
import { useState, useEffect } from "react";
import DeleteButton from "../buttons/delete_button/DeleteButton";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import EditButton from "../buttons/edit_button/EditButton";

export default function Pagination({ expenses }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [totalPages, setTotalPages] = useState(0);
  const [slicedExpenses, setSlicedExpenses] = useState([]);

  const handlePrevButton = () => {
    setCurrentPage((prevInd) => prevInd - 1);
  };

  const handleNextButton = () => {
    setCurrentPage((prevInd) => prevInd + 1);
  };

  useEffect(() => {
    setTotalPages(Math.ceil(expenses.length / itemsPerPage));
    const startIndex = (currentPage - 1) * itemsPerPage; //0, 3
    const endIndex = startIndex + itemsPerPage; //3, 6
    setSlicedExpenses(expenses.slice(startIndex, endIndex)); // 0 1 2, 3, 4, 5
  }, [currentPage, expenses]);

  useEffect(() => {
    if(slicedExpenses.length === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
    }
  }, [slicedExpenses])
  

  return (
    <div className={styles.container}>
      <div className={styles.transaction_wrapper}>
        {slicedExpenses.length === 0 && (
          <p className={styles.no_transaction}>No Transactions!</p>
        )}
        {slicedExpenses.map((expense) => {
          return (
            <div className={styles.transaction} key={expense.id}>
              <div className={styles.expense_icon}>
                {expense.category === "Food" && <PizzaIcon />}
                {expense.category === "Entertainment" && <MovieIcon />}
                {expense.category === "Travel" && <CarIcon />}
                <div className={styles.expense_name}>
                  <p>{expense.title}</p>
                  <p>
                    <span style={{ color: "gray" }}>{expense.date}</span>
                  </p>
                </div>
              </div>
              <div className={styles.expense_price}>
                <span
                  style={{
                    color: "#F4BB4A",
                    fontWeight: "800",
                    fontSize: "17px",
                  }}
                >
                  ₹{expense.price}
                </span>
                <div className={styles.delete_edit_wrapper}>
                  <DeleteButton id={expense.id} />
                  <EditButton id={expense.id} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div
        className={`${styles.button_wrapper} ${
          !slicedExpenses.length && styles.display_none
        } ${expenses.length <= itemsPerPage && styles.display_none}`}
      >
        <button
          style={{
            borderRadius: "40%",
            border: "none",
            cursor: "pointer",
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
          }}
          type="button"
        //   className={`${currentPage + 1 == 1 && styles.button_hide}`}
          disabled={currentPage == 1}
          onClick={handlePrevButton}
        >
          <ArrowLeftIcon />
        </button>
        <button
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "8px",
            backgroundColor: "#43967B",
            border: "none",
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
          }}
        >
          <span style={{ fontSize: "25px", color: "white" }}>
            {currentPage}
          </span>
        </button>
        <button
          style={{
            borderRadius: "40%",
            border: "none",
            cursor: "pointer",
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
          }}
          type="button"
          name="nextButton"
        //   className={`${currentPage + 1 == totalPages && styles.button_hide}`}
          disabled={currentPage == totalPages}
          onClick={handleNextButton}
        >
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
}

const PizzaIcon = () => {
  return (
    <TbPizza
      style={{
        backgroundColor: "#D9D9D9",
        padding: "10px",
        fontSize: "50px",
        borderRadius: "50%",
        transform: "rotate(180deg)",
        minWidth: "50px",
        minheight: "50px"
      }}
    />
  );
};

const MovieIcon = () => {
  return (
    <BiMoviePlay
      style={{
        backgroundColor: "#D9D9D9",
        padding: "10px",
        fontSize: "50px",
        borderRadius: "50%",
        minWidth: "50px",
        minheight: "50px"
      }}
    />
  );
};

const CarIcon = () => {
  return (
    <LuCarTaxiFront
      style={{
        backgroundColor: "#D9D9D9",
        padding: "10px",
        fontSize: "50px",
        borderRadius: "50%",
        minWidth: "50px",
        minheight: "50px"
      }}
    />
  );
};

const ArrowLeftIcon = () => {
  return (
    <FaArrowLeft
      style={{
        padding: "8px",
        fontSize: "16px",
        width: "40px",
        height: "40px",
        paddingTop: "13px",
      }}
      name="prevIcon"
    />
  );
};

const ArrowRightIcon = () => {
  return (
    <FaArrowRight
      style={{
        padding: "8px",
        fontSize: "16px",
        width: "40px",
        height: "40px",
        paddingTop: "13px",
      }}
      name="nextIcon"
    />
  );
};