import React from "react";
import { it, expect, describe, vi } from "vitest";
import { Product } from "./Product";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

describe("Product Component", () => {
  it("displays product name correctly", () => {

    const product = {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"]
    };

    const loadCart = vi.fn();

    render(
      <MemoryRouter>
        <Product product={product} loadCart={loadCart} />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/Black and Gray Athletic Cotton Socks/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/\$10.90/i)
    ).toBeInTheDocument();

    expect(
      screen.getByTestId('product-image')
    ).toHaveAttribute('src',"images/products/athletic-cotton-socks-6-pairs.jpg")

    expect(
      screen.getByTestId('product-rating-stars-image')
    ).toHaveAttribute('src','images/ratings/rating-45.png')

    expect(
      screen.getByText('87')
    ).toBeInTheDocument();
  });
});

     



