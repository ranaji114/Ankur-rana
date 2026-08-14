"use client";

import { useState } from "react";
import { sound } from "@/lib/audio-haptics";

const lexerTokens = [
  { type: "KEYWORD", value: "fn", color: "#c792ea" },
  { type: "IDENT", value: "compute_entropy", color: "#82aaff" },
  { type: "LPAREN", value: "(", color: "#e5e5e5" },
  { type: "IDENT", value: "energy", color: "#f78c6c" },
  { type: "COMMA", value: ",", color: "#e5e5e5" },
  { type: "IDENT", value: "time_layer", color: "#f78c6c" },
  { type: "RPAREN", value: ")", color: "#e5e5e5" },
  { type: "LBRACE", value: "{", color: "#e5e5e5" },
  { type: "KEYWORD", value: "let", color: "#c792ea" },
  { type: "IDENT", value: "base_rate", color: "#f78c6c" },
  { type: "ASSIGN", value: "=", color: "#89ddff" },
  { type: "NUMBER", value: "1.618", color: "#ffcb6b" },
  { type: "SEMICOLON", value: ";", color: "#e5e5e5" },
  { type: "KEYWORD", value: "let", color: "#c792ea" },
  { type: "IDENT", value: "delta", color: "#f78c6c" },
  { type: "ASSIGN", value: "=", color: "#89ddff" },
  { type: "IDENT", value: "energy", color: "#f78c6c" },
  { type: "OP_MUL", value: "*", color: "#89ddff" },
  { type: "IDENT", value: "base_rate", color: "#f78c6c" },
  { type: "OP_DIV", value: "/", color: "#89ddff" },
  { type: "IDENT", value: "time_layer", color: "#f78c6c" },
  { type: "SEMICOLON", value: ";", color: "#e5e5e5" },
  { type: "KEYWORD", value: "return", color: "#c792ea" },
  { type: "IDENT", value: "delta", color: "#f78c6c" },
  { type: "SEMICOLON", value: ";", color: "#e5e5e5" },
  { type: "RBRACE", value: "}", color: "#e5e5e5" },
];

const bytecodeInstructions = [
  { offset: "0000", opcode: "OP_CONSTANT", arg: "fn<compute_entropy>", desc: "Push function reference" },
  { offset: "0002", opcode: "OP_DEFINE_GLOBAL", arg: "0 ('compute_entropy')", desc: "Register in global table" },
  { offset: "0004", opcode: "OP_CONSTANT", arg: "1 (4)", desc: "Load integer constant 4" },
  { offset: "0006", opcode: "OP_DEFINE_GLOBAL", arg: "2 ('time_layer')", desc: "Bind variable time_layer" },
  { offset: "0008", opcode: "OP_GET_GLOBAL", arg: "0 ('compute_entropy')", desc: "Prepare call stack" },
  { offset: "0010", opcode: "OP_CONSTANT", arg: "3 (108)", desc: "Push arg 0: 108" },
  { offset: "0012", opcode: "OP_GET_GLOBAL", arg: "2 ('time_layer')", desc: "Push arg 1: 4" },
  { offset: "0014", opcode: "OP_CALL", arg: "2 args", desc: "Invoke closure frame" },
  { offset: "0016", opcode: "OP_PRINT", arg: "1 arg", desc: "Emit to stdout stream" },
  { offset: "0018", opcode: "OP_HALT", arg: "-", desc: "Graceful VM exit (code 0)" },
];

export function EzraPlayground() {
  const [activeTab, setActiveTab] = useState<"code" | "tokens" | "ast" | "bytecode" | "terminal">("code");
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string[]>([]);

  const handleRun = () => {
    sound.play("run");
    setIsRunning(true);
    setActiveTab("terminal");
    setOutput(["[Ezra Rust VM] Initializing runtime environment...", "[Compiler] Emitting bytecode chunk (19 ops)..."]);

    setTimeout(() => {
      setOutput((prev) => [
        ...prev,
        "[VM Execution] Stack allocated: 256 bytes",
        ">> Computed Entropy State: 43.686",
        "[Process] Finished in 0.42ms with exit code 0",
      ]);
      setIsRunning(false);
      sound.play("pop");
    }, 380);
  };

  return (
    <div className="ezra-playground">
      {/* Terminal Title Bar */}
      <div className="ezra-playground-header">
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div className="ezra-window-dots">
            <span className="ezra-dot ezra-dot-red" />
            <span className="ezra-dot ezra-dot-yellow" />
            <span className="ezra-dot ezra-dot-green" />
          </div>
          <span style={{ fontSize: "0.74rem", color: "#9ca3af", fontWeight: 600 }}>
            ezra-core v0.1.4 · Rust Compiler &amp; Bytecode VM
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="ezra-tabs-nav">
          <button
            type="button"
            className={`ezra-tab-btn ${activeTab === "code" ? "ezra-tab-btn-active" : ""}`}
            onClick={() => {
              sound.play("click");
              setActiveTab("code");
            }}
          >
            01 Code
          </button>
          <button
            type="button"
            className={`ezra-tab-btn ${activeTab === "tokens" ? "ezra-tab-btn-active" : ""}`}
            onClick={() => {
              sound.play("click");
              setActiveTab("tokens");
            }}
          >
            02 Lexer
          </button>
          <button
            type="button"
            className={`ezra-tab-btn ${activeTab === "ast" ? "ezra-tab-btn-active" : ""}`}
            onClick={() => {
              sound.play("click");
              setActiveTab("ast");
            }}
          >
            03 AST Tree
          </button>
          <button
            type="button"
            className={`ezra-tab-btn ${activeTab === "bytecode" ? "ezra-tab-btn-active" : ""}`}
            onClick={() => {
              sound.play("click");
              setActiveTab("bytecode");
            }}
          >
            04 Bytecode VM
          </button>
          <button
            type="button"
            className={`ezra-tab-btn ${activeTab === "terminal" ? "ezra-tab-btn-active" : ""}`}
            onClick={() => {
              sound.play("click");
              setActiveTab("terminal");
            }}
          >
            05 Output
          </button>
        </div>

        {/* Run Button */}
        <button
          type="button"
          className="ezra-run-btn"
          onClick={handleRun}
          disabled={isRunning}
        >
          <span>▶</span>
          <span>{isRunning ? "Executing..." : "Run in VM"}</span>
        </button>
      </div>

      {/* Code Editor View */}
      {activeTab === "code" && (
        <pre className="ezra-code-pane">
          <code>
            <span style={{ color: "#546e7a" }}>{"// Ezra Scripting Language (written in Rust)"}</span>
            {"\n"}
            <span style={{ color: "#c792ea" }}>fn </span>
            <span style={{ color: "#82aaff" }}>compute_entropy</span>
            <span style={{ color: "#e5e5e5" }}>(energy, time_layer) &#123;</span>
            {"\n"}    <span style={{ color: "#c792ea" }}>let </span>
            <span style={{ color: "#f78c6c" }}>base_rate </span>
            <span style={{ color: "#89ddff" }}>= </span>
            <span style={{ color: "#ffcb6b" }}>1.618</span>;
            {"\n"}    <span style={{ color: "#c792ea" }}>let </span>
            <span style={{ color: "#f78c6c" }}>delta </span>
            <span style={{ color: "#89ddff" }}>= </span>
            <span style={{ color: "#e5e5e5" }}>energy * base_rate / time_layer;</span>
            {"\n"}    <span style={{ color: "#c792ea" }}>return </span>
            <span style={{ color: "#f78c6c" }}>delta</span>;
            {"\n"}&#125;
            {"\n\n"}
            <span style={{ color: "#c792ea" }}>let </span>
            <span style={{ color: "#f78c6c" }}>time_layer </span>
            <span style={{ color: "#89ddff" }}>= </span>
            <span style={{ color: "#ffcb6b" }}>4</span>;
            {"\n"}
            <span style={{ color: "#c792ea" }}>let </span>
            <span style={{ color: "#f78c6c" }}>reality_matrix </span>
            <span style={{ color: "#89ddff" }}>= </span>
            <span style={{ color: "#82aaff" }}>compute_entropy</span>(
            <span style={{ color: "#ffcb6b" }}>108</span>, time_layer);
            {"\n"}
            <span style={{ color: "#82aaff" }}>print</span>(
            <span style={{ color: "#c3e88d" }}>&quot;Computed Entropy State:&quot;</span>, reality_matrix);
          </code>
        </pre>
      )}

      {/* Lexer Tokens View */}
      {activeTab === "tokens" && (
        <div className="ezra-code-pane">
          <p style={{ color: "#6b7280", fontSize: "0.74rem", marginBottom: "0.75rem" }}>
            [Lexer Output] 26 Token Stream parsed with zero-copy Rust slices:
          </p>
          <div className="ezra-token-grid">
            {lexerTokens.map((tok, i) => (
              <div key={i} className="ezra-token-pill">
                <span style={{ color: "#9ca3af", fontSize: "0.65rem" }}>{tok.type}</span>
                <span style={{ color: tok.color, fontWeight: 700 }}>{tok.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AST Hierarchy View */}
      {activeTab === "ast" && (
        <div className="ezra-code-pane">
          <p style={{ color: "#6b7280", fontSize: "0.74rem", marginBottom: "0.75rem" }}>
            [AST Node Hierarchy] Validated Grammar Tree:
          </p>
          <div className="ezra-ast-tree">
            <div className="ezra-ast-branch">├── ProgramRoot</div>
            <div className="ezra-ast-branch" style={{ paddingLeft: "1.25rem" }}>
              ├── FunctionDeclaration: <span style={{ color: "#ffcb6b" }}>compute_entropy</span>
            </div>
            <div className="ezra-ast-branch" style={{ paddingLeft: "2.5rem" }}>
              ├── Params: [energy, time_layer]
            </div>
            <div className="ezra-ast-branch" style={{ paddingLeft: "2.5rem" }}>
              └── BlockStatement (3 exprs)
            </div>
            <div className="ezra-ast-branch" style={{ paddingLeft: "1.25rem" }}>
              ├── VariableDeclaration: <span style={{ color: "#ffcb6b" }}>time_layer = 4</span>
            </div>
            <div className="ezra-ast-branch" style={{ paddingLeft: "1.25rem" }}>
              ├── CallExpression: <span style={{ color: "#ffcb6b" }}>compute_entropy(108, 4)</span>
            </div>
            <div className="ezra-ast-branch" style={{ paddingLeft: "1.25rem" }}>
              └── PrintStatement
            </div>
          </div>
        </div>
      )}

      {/* Bytecode Disassembly View */}
      {activeTab === "bytecode" && (
        <div className="ezra-code-pane" style={{ padding: "0.5rem" }}>
          <table className="ezra-bytecode-table">
            <thead>
              <tr>
                <th>Offset</th>
                <th>Opcode</th>
                <th>Operand</th>
                <th>Pipeline Action</th>
              </tr>
            </thead>
            <tbody>
              {bytecodeInstructions.map((inst) => (
                <tr key={inst.offset}>
                  <td style={{ color: "#6b7280" }}>{inst.offset}</td>
                  <td style={{ color: "#38bdf8", fontWeight: 700 }}>{inst.opcode}</td>
                  <td style={{ color: "#ffcb6b" }}>{inst.arg}</td>
                  <td style={{ color: "#9ca3af" }}>{inst.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Terminal View */}
      {activeTab === "terminal" && (
        <div className="ezra-terminal-view">
          {output.length === 0 ? (
            <p style={{ color: "#9ca3af" }}>
              Terminal idle. Click &quot;Run in VM&quot; to execute Ezra bytecode on the Rust stack virtual machine.
            </p>
          ) : (
            output.map((line, i) => (
              <div key={i} style={{ color: line.startsWith(">>") ? "#38bdf8" : "#4ade80", marginBlock: "2px" }}>
                {line}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
