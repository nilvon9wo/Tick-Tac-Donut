import { OpponentService } from './opponent.service';

import State  from './state';

describe( 'OpponentService', () => {

    let serviceUnderTest: OpponentService;

    beforeEach(() => {
        serviceUnderTest = new OpponentService();
    });

    describe( 'takeTurn', () => {
        it( 'should mark a random unoccupied cell', () => {
            // Arrange
            const testState = new State();

            const randomBackup = Math.random;
            const floorBackup = Math.floor;
            const randomResult = 1;
            let randomWasCalled = false;
            let floorWasCalled = false;

            Math.random = () => {
                randomWasCalled = true;
                return randomResult;
            };

            Math.floor = () => {
                floorWasCalled = true;
                return randomResult;
            };

            // Act
            const resultState = serviceUnderTest.takeTurn(testState);

            // Assert
            expect( randomWasCalled ).toEqual( true );
            expect( floorWasCalled ).toEqual( true );
            expect(resultState.cells[randomResult]['marker']).toEqual(testState.computer);

            // Clean-up
            Math.random = randomBackup;
            Math.floor = floorBackup;
        });
    });
});
