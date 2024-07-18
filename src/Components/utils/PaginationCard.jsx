"use client";

import { Pagination } from "flowbite-react";
import PropTypes from "prop-types"; // Importa PropTypes

export default function PaginationCard({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex overflow-x-auto sm:justify-center">
      <Pagination
        layout="pagination"
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        previousLabel="Anterior"
        nextLabel="Siguiente"
        showIcons
      />
    </div>
  );
}

PaginationCard.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
}