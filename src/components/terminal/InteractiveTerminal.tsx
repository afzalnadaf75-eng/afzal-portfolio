import React, { useState, useEffect, useRef } from 'react';
import { X, Terminal as TerminalIcon, CornerDownLeft, Maximize2, Minimize2 } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS_DATA, SKILLS_DATA } from '../../data/portfolioData';
import { soundEngine } from '../../utils/audio';

interface InteractiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerWarp: () => void;
}

interface CommandLog {
  id: string;
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
  isOpen,
  onClose,
  onTriggerWarp,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      id: 'init-1',
      command: 'sys_init',
      output: (
        <div className="text-[#A1A1AA] space-y-1">
          <div className="text-[#42D9FF] font-bold">AFZAL_OS [Version 2.0.26-Cosmic]</div>
          <div>Type <span className="text-[#9B5CFF] font-semibold">&apos;help&apos;</span> to inspect available universe commands.</div>
        </div>
      ),
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  if (!isOpen) return null;

  const handleCommand = (cmd: string) => {
    soundEngine.playKeyBlip();
    const cleanCmd = cmd.trim().toLowerCase();
    const timestamp = new Date().toLocaleTimeString();

    if (!cleanCmd) return;

    setHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    let response: React.ReactNode = null;

    switch (cleanCmd) {
      case 'help':
        response = (
          <div className="space-y-1.5 text-xs text-[#A1A1AA]">
            <div className="text-white font-semibold mb-1">AVAILABLE COMMANDS:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
              <div><span className="text-[#9B5CFF] font-bold">about</span> - Biography & engineering focus</div>
              <div><span className="text-[#9B5CFF] font-bold">skills</span> - Full technology stack overview</div>
              <div><span className="text-[#9B5CFF] font-bold">projects</span> - List of selected case studies</div>
              <div><span className="text-[#9B5CFF] font-bold">journey</span> - Timeline milestones</div>
              <div><span className="text-[#9B5CFF] font-bold">contact</span> - Transmission credentials</div>
              <div><span className="text-[#9B5CFF] font-bold">github</span> - Direct link to GitHub repos</div>
              <div><span className="text-[#9B5CFF] font-bold">warp</span> - Re-engage cinematic warp drive</div>
              <div><span className="text-[#9B5CFF] font-bold">clear</span> - Flush terminal screen buffer</div>
              <div><span className="text-[#9B5CFF] font-bold">exit</span> - Dismiss interactive terminal</div>
            </div>
          </div>
        );
        break;

      case 'about':
        response = (
          <div className="space-y-2 text-xs text-[#A1A1AA] max-w-xl">
            <div className="text-white font-bold">{PERSONAL_INFO.name}</div>
            <div className="text-[#42D9FF]">{PERSONAL_INFO.title}</div>
            <p className="leading-relaxed">{PERSONAL_INFO.fullBio}</p>
          </div>
        );
        break;

      case 'skills':
        response = (
          <div className="space-y-2 text-xs text-[#A1A1AA]">
            <div className="text-white font-bold mb-1">CORE TECHNOLOGIES:</div>
            <div>
              <span className="text-[#9B5CFF] font-semibold">Programming:</span>{' '}
              {SKILLS_DATA.filter((s) => s.category === 'programming').map((s) => s.name).join(', ')}
            </div>
            <div>
              <span className="text-[#42D9FF] font-semibold">Frontend:</span>{' '}
              {SKILLS_DATA.filter((s) => s.category === 'frontend').map((s) => s.name).join(', ')}
            </div>
            <div>
              <span className="text-purple-400 font-semibold">Backend:</span>{' '}
              {SKILLS_DATA.filter((s) => s.category === 'backend').map((s) => s.name).join(', ')}
            </div>
            <div>
              <span className="text-emerald-400 font-semibold">Database:</span>{' '}
              {SKILLS_DATA.filter((s) => s.category === 'database').map((s) => s.name).join(', ')}
            </div>
            <div>
              <span className="text-amber-400 font-semibold">Tools:</span>{' '}
              {SKILLS_DATA.filter((s) => s.category === 'tools').map((s) => s.name).join(', ')}
            </div>
          </div>
        );
        break;

      case 'projects':
        response = (
          <div className="space-y-2.5 text-xs text-[#A1A1AA]">
            <div className="text-white font-bold mb-1">FEATURED CASE STUDIES:</div>
            {PROJECTS_DATA.map((p) => (
              <div key={p.id} className="p-2 rounded bg-white/5 border border-white/5">
                <span className="text-[#9B5CFF] font-bold">[{p.number}] {p.title}</span>
                <p className="text-white/80 mt-0.5">{p.tagline}</p>
                <div className="text-[10px] text-[#42D9FF] mt-1 font-mono">
                  Stack: {p.technologies.join(', ')}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        response = (
          <div className="space-y-1.5 text-xs text-[#A1A1AA]">
            <div className="text-white font-bold">TRANSMISSION DIRECTORY:</div>
            <div>Email: <a href={`mailto:${PERSONAL_INFO.email}`} className="text-[#42D9FF] underline">{PERSONAL_INFO.email}</a></div>
            <div>GitHub: <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-[#9B5CFF] underline">{PERSONAL_INFO.github}</a></div>
            <div>Status: <span className="text-emerald-400">{PERSONAL_INFO.availability}</span></div>
          </div>
        );
        break;

      case 'github':
        response = (
          <div className="text-xs text-[#A1A1AA]">
            Opening GitHub repository matrix in new tab:{' '}
            <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-[#42D9FF] underline font-bold">
              {PERSONAL_INFO.github}
            </a>
          </div>
        );
        window.open(PERSONAL_INFO.github, '_blank');
        break;

      case 'warp':
        response = <div className="text-[#9B5CFF] font-bold">ENGAGING WARP SPEED DRIVE...</div>;
        setTimeout(() => {
          onClose();
          onTriggerWarp();
        }, 400);
        break;

      case 'clear':
        setLogs([]);
        return;

      case 'exit':
        onClose();
        return;

      case 'whoami':
        response = <div className="text-[#42D9FF]">explorer@afzal-digital-universe:~$</div>;
        break;

      case 'date':
        response = <div className="text-white">{new Date().toString()}</div>;
        break;

      default:
        response = (
          <div className="text-rose-400 text-xs">
            command not found: &apos;{cleanCmd}&apos;. Type &apos;help&apos; for list of commands.
          </div>
        );
        break;
    }

    setLogs((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        command: cmd,
        output: response,
        timestamp,
      },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInputVal(history[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex >= history.length) {
          setHistoryIndex(-1);
          setInputVal('');
        } else {
          setHistoryIndex(nextIndex);
          setInputVal(history[nextIndex]);
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div
        className={`w-full ${
          isExpanded ? 'max-w-5xl h-[85vh]' : 'max-w-2xl h-[520px]'
        } bg-[#0A0A10]/95 border border-white/20 rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden font-mono text-sm transition-all duration-300`}
      >
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#11111A] border-b border-white/10 select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer" onClick={onClose} />
            <span
              className="w-3 h-3 rounded-full bg-yellow-500/80 cursor-pointer"
              onClick={() => setIsExpanded(!isExpanded)}
            />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="text-xs text-[#A1A1AA] ml-2 flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-[#42D9FF]" />
              afzal@cosmos:~ (zsh)
            </span>
          </div>

          <div className="flex items-center gap-2 text-[#A1A1AA]">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:text-white transition-colors"
              title={isExpanded ? 'Restore window size' : 'Maximize window'}
            >
              {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button onClick={onClose} className="p-1 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Logs Output */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4">
          {logs.map((log) => (
            <div key={log.id} className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-[#A1A1AA]/70">
                <span className="text-[#42D9FF]">guest@cosmos:~$</span>
                <span className="text-white font-semibold">{log.command}</span>
                <span className="text-[10px] ml-auto text-white/30">{log.timestamp}</span>
              </div>
              <div className="pl-4 border-l border-white/10 mt-1">{log.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Input Line */}
        <div className="p-3 bg-[#0D0D14] border-t border-white/10 flex items-center gap-2">
          <span className="text-[#42D9FF] text-xs font-bold">guest@cosmos:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help', 'projects', 'skills'..."
            className="flex-1 bg-transparent text-sm text-white placeholder-white/20 focus:outline-none font-mono"
            autoFocus
          />
          <button
            onClick={() => {
              handleCommand(inputVal);
              setInputVal('');
            }}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#42D9FF]"
            title="Execute Command"
          >
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
