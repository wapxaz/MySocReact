import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

// статься по тестам - https://www.valentinog.com/blog/testing-react/

describe("ProfileStatus component", () => {
    test("status from props should be in te state", () => {
        const component = create(<ProfileStatus status="TestData1" />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("TestData1");
    });

    test("after created <span> should be displayed", () => {
        const component = create(<ProfileStatus status="TestData1" />);
        const root = component.root;
        let span = root.findByType("span");
        expect(span).not.toBeNull();
    });

    test("after created <input> should'n be displayed", () => {
        const component = create(<ProfileStatus status="TestData1" />);
        const root = component.root;
        expect(() => {
            let input = root.findByType("input");
        }).toThrow()
    });

    test("after created <span> should be have a value", () => {
        const component = create(<ProfileStatus status="TestData1" />);
        const root = component.root;
        let span = root.findByType("span");
        expect(span.children[0]).toBe("TestData1");
    });

    test("input should be displayed in editMode instead of span", () => {
        const component = create(<ProfileStatus status="TestData1" />);
        const root = component.root;
        let span = root.findByType("span");
        span.props.onDoubleClick();
        let input = root.findByType("input");
        expect(input.props.value).toBe("TestData1");
    });

    test("callback should be called", () => {
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status="TestData1" updateStatus={mockCallback} />);
        const instance = component.getInstance();
        instance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);
    });
});