import XCTest
import SwiftTreeSitter
import TreeSitterTee

final class TreeSitterTeeTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_tee())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Tee grammar")
    }
}
