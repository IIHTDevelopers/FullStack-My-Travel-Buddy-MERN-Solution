import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';

describe("boundary", () => {
    test("AppComponent boundary should mount App without crashing", () => {
        const { getByText } = render(<App />);
        const colorMeButton = getByText('Color me');
        expect(colorMeButton).toBeInTheDocument();
    });
});
