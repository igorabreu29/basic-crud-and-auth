export function defaultDateMock() {
    const mockDate = new Date(2023, 1, 5, 14)
    vi.setSystemTime(mockDate)
}