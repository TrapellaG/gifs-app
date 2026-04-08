import { describe, expect, test, vi } from "vitest";
import { useGifs } from "./useGifs";
import { act, renderHook } from "@testing-library/react";
import * as gifsActions from "../actions/get-gifs-by-query.action";

describe("useGifs", () => {
  test("should recive default values and methods", () => {
    const { result } = renderHook(() => useGifs());

    expect(result.current.gifs.length).toBe(0);
    expect(result.current.previousSearches.length).toBe(0);
    expect(result.current.handleSearch).toBeDefined();
    expect(result.current.handlePreviousSearchesClicked).toBeDefined();
  });

  test("should return a list of gifs", async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleSearch("goku");
    });

    expect(result.current.gifs.length).toBe(10);
  });

  test("should return a list of gifs when handlePreviousSearchesClicked is called", async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handlePreviousSearchesClicked("goku");
    });

    expect(result.current.gifs.length).toBe(10);
  });

  test("should return a list of gifs from chache", async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handlePreviousSearchesClicked("goku");
    });

    expect(result.current.gifs.length).toBe(10);

    vi.spyOn(gifsActions, "getGifsByQuery").mockRejectedValue(
      new Error("this is my custom error")
    );

    await act(async () => {
      await result.current.handlePreviousSearchesClicked("goku");
    });

    expect(result.current.gifs.length).toBe(10);
  });

  test("should return no more than 8 previous searches", async () => {
    const { result } = renderHook(() => useGifs());

    vi.spyOn(gifsActions, "getGifsByQuery").mockResolvedValue([]);

    await act(async () => {
      await result.current.handleSearch("goku1");
    });
    await act(async () => {
      await result.current.handleSearch("goku2");
    });
    await act(async () => {
      await result.current.handleSearch("goku3");
    });
    await act(async () => {
      await result.current.handleSearch("goku4");
    });
    await act(async () => {
      await result.current.handleSearch("goku5");
    });
    await act(async () => {
      await result.current.handleSearch("goku6");
    });
    await act(async () => {
      await result.current.handleSearch("goku7");
    });
    await act(async () => {
      await result.current.handleSearch("goku8");
    });
    await act(async () => {
      await result.current.handleSearch("goku9");
    });

    expect(result.current.previousSearches.length).toBe(8);

    expect(result.current.previousSearches).toStrictEqual([
      "goku9",
      "goku8",
      "goku7",
      "goku6",
      "goku5",
      "goku4",
      "goku3",
      "goku2",
    ]);
  });
});
