import { AdjudicatorService } from './adjudicator.service';
import Ending from '../etc/ending';
import Marker from '../etc/marker.enum';
import State from '../etc/state';

describe( 'AdjudicatorService', () => {
    let serviceUnderTest: AdjudicatorService;

    beforeEach(() => {
        serviceUnderTest = new AdjudicatorService();
    });

    function createTestState( marker: Marker, positions: Array<number> ) {
        const state = new State();
        const markedState = modifyState( state, marker, positions );
        return markedState;
    }

    function modifyState( state: State, marker: Marker, positions: Array<number> ) {
        positions.forEach( position => {
            state.cells[position].setMarker( marker );
        });
        return state;
    }

    describe( 'judge', () => {
        describe( 'Positive (Winning) Scenarios', () => {
            function playerShouldWinTest(
                testPlayer: Marker,
                testRequiredPositions: Array<number>
            ) {
                // Arrange
                const testState = createTestState( testPlayer, testRequiredPositions );
                // Act
                const result = serviceUnderTest.judge( testState );
                // Assert
                expect( result.winner ).toEqual( testPlayer );
                const sortedResultLine = result.line.sort();
                const sortedRequiredPositionsd = testRequiredPositions.sort();
                expect( sortedResultLine[0] ).toEqual( sortedRequiredPositionsd[0] );
                expect( sortedResultLine[1] ).toEqual( sortedRequiredPositionsd[1] );
                expect( sortedResultLine[2] ).toEqual( sortedRequiredPositionsd[2] );
            }

            it( 'should declare X the winner when X is in positions 0, 1, and 2', () => {
                playerShouldWinTest( Marker.X, [0, 1, 2] );
            });

            it( 'should declare O the winner when O is in positions 0, 3, and 6', () => {
                playerShouldWinTest( Marker.O, [0, 3, 6] );
            });

            it( 'should declare X the winner when X is in positions 0, 4, and 8', () => {
                playerShouldWinTest( Marker.X, [0, 4, 8] );
            });

            it( 'should declare O the winner when O is in positions 1, 4, and 7', () => {
                playerShouldWinTest( Marker.O, [1, 4, 7] );
            });

            it( 'should declare X the winner when X is in positions 2, 4, and 6', () => {
                playerShouldWinTest( Marker.X, [2, 4, 6] );
            });

            it( 'should declare O the winner when O is in positions 2, 5, and 8', () => {
                playerShouldWinTest( Marker.O, [2, 5, 8] );
            });

            it( 'should declare X the winner when X is in positions 3, 4, and 5', () => {
                playerShouldWinTest( Marker.X, [3, 4, 5] );
            });

            it( 'should declare O the winner when O is in positions 6, 7, and 8', () => {
                playerShouldWinTest( Marker.O, [6, 7, 8] );
            });
        });

        describe( 'Negative (Winnerless) Scenarios - Player does not have a complete line',
            () => {
                function noPlayerShouldWinWithoutLineTest(
                    testPlayer: Marker,
                    testPositions: Array<number>
                ) {
                    // Arrange
                    const testState = createTestState( testPlayer, testPositions );
                    // Act
                    const result = serviceUnderTest.judge( testState );
                    // Assert
                    expect( result ).toEqual( undefined );
                }

                it( 'should not declare X the player when X is in positions 0, 1', () => {
                    noPlayerShouldWinWithoutLineTest( Marker.X, [0, 1] );
                });

                it( 'should not declare O the player when O is in positions 0, 3, 5', () => {
                    noPlayerShouldWinWithoutLineTest( Marker.O, [0, 3, 5] );
                });

                it( 'should not declare X the player when X is in positions 1, 4, 8', () => {
                    noPlayerShouldWinWithoutLineTest( Marker.X, [1, 4, 8] );
                });

                it( 'should not declare X the player when X is in positions 2, 3, 4', () => {
                    noPlayerShouldWinWithoutLineTest( Marker.X, [2, 3, 4] );
                });

                it( 'should not declare O the player when O is in positions 2, 3, 6', () => {
                    noPlayerShouldWinWithoutLineTest( Marker.O, [2, 3, 6] );
                });

                it( 'should not declare X the player when X is in positions 2, 4, 7', () => {
                    noPlayerShouldWinWithoutLineTest( Marker.X, [2, 4, 7] );
                });

                it( 'should not declare O the player when O is in positions 2, 6, 8', () => {
                    noPlayerShouldWinWithoutLineTest( Marker.O, [2, 6, 8] );
                });

                it( 'should not declare O the player when O is in positions 5, 6, 7', () => {
                    noPlayerShouldWinWithoutLineTest( Marker.O, [5, 6, 7] );
                });
            }
        );

        describe(
            'Negative (Winnerless) Scenarios - Player does not have an uninterrupted line',
            () => {
                function noPlayerShouldWinIfLineIsInterrupted(
                    player1: Marker, player1Positions: Array<number>,
                    player2: Marker, player2Positions: Array<number>
                ) {
                    // Arrange
                    const testState = createTestState( player1, player1Positions );
                    const comarkedState = modifyState( testState, player2, player2Positions );
                    // Act
                    const result = serviceUnderTest.judge( comarkedState );
                    // Assert
                    expect( result ).toEqual( undefined );
                }

                it( 'should declare no winner when X is in positions 0, 1 and O is in position 2',
                    () => {
                        noPlayerShouldWinIfLineIsInterrupted( Marker.X, [0, 1], Marker.O, [2] );
                    }
                );

                it( 'should declare no winner when O is in positions 0, 3 and X is in position 3',
                    () => {
                        noPlayerShouldWinIfLineIsInterrupted( Marker.O, [0, 3], Marker.X, [6] );
                    }
                );

                it( 'should declare no winner when X is in positions 0 and O is in position 4, 8',
                    () => {
                        noPlayerShouldWinIfLineIsInterrupted( Marker.X, [0], Marker.O, [4, 8] );
                    }
                );

                it( 'should declare no winner when O is in positions 1 and X is in position 4, 7',
                    () => {
                        noPlayerShouldWinIfLineIsInterrupted( Marker.O, [1], Marker.X, [4, 7] );
                    }
                );

                it( 'should declare no winner when X is in positions 2,4 and O is in position 6',
                    () => {
                        noPlayerShouldWinIfLineIsInterrupted( Marker.X, [2, 4], Marker.O, [6] );
                    }
                );

                it( 'should declare no winner when O is in positions 2,5 and X is in position 8',
                    () => {
                        noPlayerShouldWinIfLineIsInterrupted( Marker.O, [2, 5], Marker.X, [8] );
                    }
                );

                it( 'should declare no winner when X is in positions 3 and O is in position 4, 5',
                    () => {
                        noPlayerShouldWinIfLineIsInterrupted( Marker.X, [0], Marker.O, [4, 8] );
                    }
                );

                it( 'should declare no winner when O is in positions 6 and X is in position  7, 8',
                    () => {
                        noPlayerShouldWinIfLineIsInterrupted( Marker.O, [6], Marker.X, [7, 8] );
                    }
                );
            }
        );

        describe( 'Negative (Winnerles) Scenarios - Full board without winner', () => {
            function gameIsADraw(
                player1: Marker, player1Positions: Array<number>,
                player2: Marker, player2Positions: Array<number>
            ) {
                // Arrange
                const testState = createTestState( player1, player1Positions );
                const comarkedState = modifyState( testState, player2, player2Positions );
                // Act
                const result = serviceUnderTest.judge( comarkedState );
                // Assert
                expect( result instanceof Ending ).toBeTruthy();
            }

            it( 'should declare ending without winner ' +
                'when X is in positions 0,1,4,5,6 and O is in position  2,3,7, 8',
                () => {
                    gameIsADraw( Marker.X, [0, 1, 4, 5, 6], Marker.O, [2, 3, 7, 8] );
                }
            );
        });
    });
});
