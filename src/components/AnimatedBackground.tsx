import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNebula } from '@/contexts/NebulaContext';
import NebulaTerminalButton from './nebula/NebulaTerminalButton';
import NebulaTerminal from './nebula/NebulaTerminal';

// Заранее созданные позиции для голографических эффектов
const blobPositions = [
  { initialX: 10, initialY: 15, animateX: 20, animateY: 25, scale: 0.8, opacity: 0.1, duration: 20, width: 150, height: 150 },
  { initialX: 22, initialY: 25, animateX: 30, animateY: 33, scale: 0.9, opacity: 0.12, duration: 25, width: 230, height: 230 },
  { initialX: 58, initialY: 55, animateX: 60, animateY: 57, scale: 1.2, opacity: 0.18, duration: 40, width: 470, height: 470 },
  { initialX: 70, initialY: 65, animateX: 70, animateY: 65, scale: 1.3, opacity: 0.2, duration: 45, width: 550, height: 550 },
];

// Предгенерируем случайные ID для технических данных
const TECH_IDS = Array.from({ length: 5 }, () => 
  Math.random().toString(16).substring(2, 10)
);

// Интерактивный терминал с кодом - заменим на оптимизированную версию
const jjCodeLines = [
  "export class JJCore extends QuantumNeuralProcessor {",
  "  constructor(config: IJJConfig) {",
  "    super(config.quantumState, config.entanglementFactor);",
  "    this.synapticLayers = new Map<string, SynapticLayer>();",
  "    this.tensorFields = config.dimensions.map(d => new TensorField(d, 0.472));",
  "    this.eigenVectors = generateEigenspace(config.hilbertDimension);",
  "  }",
  "",
  "  @JJOptimizer({ precision: 'fp16', accelerator: 'CUDA' })",
  "  public async processQuantumState(input: QuantumTensor<T>): Promise<JJResponse> {",
  "    const normalizedInput = await this.preprocess(input, { normalize: true });",
  "    const eigenFactors = calculateEigenFactors(normalizedInput, this.eigenVectors);",
  "",
  "    return this.tensorFields.reduce((acc, field) => {",
  "      const fieldResponse = field.propagate(eigenFactors, { depth: this.recursionDepth });",
  "      return acc.compose(fieldResponse, JJ.COMPOSITION_STRATEGIES.QUANTUM_ADD);",
  "    }, new JJResponse(JJ.QUANTUM_CONFIGS.BASE));",
  "  }",
  "",
  "  protected async preprocess(input: QuantumTensor<T>, options?: PreprocessOptions): Promise<NormalizedTensor> {",
  "    const { normalize = true, dimensionReduce = false } = options || {};",
  "    await JJ.GPU.lock({ priority: JJ.PRIORITIES.HIGH });",
  "    ",
  "    try {",
  "      const preprocessed = await JJ.Preprocessor.applyFilters(input, {",
  "        quantumNoise: { reduction: 0.87, strategy: 'ADAPTIVE_THRESHOLD' },",
  "        entanglementPreservation: true,",
  "        batchNormalization: { epsilon: 1e-5, momentum: 0.99 }",
  "      });",
  "      ",
  "      if (dimensionReduce && input.dimensions.length > 3) {",
  "        return JJ.DimensionReducer.tSNE(preprocessed, { perplexity: 30 });",
  "      }",
  "      ",
  "      return normalize ?",
  "        JJ.Normalizers.minMaxQuantum(preprocessed, -1, 1) : preprocessed;",
  "    } finally {",
  "      await JJ.GPU.release();",
  "    }",
  "  }",
  "}",
  "",
  "const jjInstance = new JJCore({",
  "  quantumState: QuantumState.fromEntanglement(0.85),",
  "  entanglementFactor: 0.42,",
  "  dimensions: [512, 256, 128, 64],",
  "  hilbertDimension: 4096,",
  "  recursionDepth: 3",
  "});",
  "",
  "JJ.Registry.registerInstance(jjInstance, {",
  "  id: 'jj-core-quantum-v4.2.1',",
  "  replicas: process.env.NODE_ENV === 'production' ? 3 : 1,",
  "  loadBalancing: 'ROUND_ROBIN'",
  "});",
];

const nebulaCodeLines = [
  "export class NEBULACore extends QuantumNeuralProcessor implements INeuromorphicSystem {",
  "  private synapticLayers: Map<string, SynapticLayer>;",
  "  private tensorFields: TensorField[];",
  "  private eigenVectors: EigenVector[];",
  "  private quantumEntangler: QuantumEntangler;",
  "  private neuralShields: NeuralShield[];",
  "  private securityBypass: SecurityBypassModule;",
  "  private adaptiveFirewall: AdaptiveFirewall;",
  "",
  "  constructor(config: INEBULAConfig) {",
  "    super(config.quantumState, config.entanglementFactor);",
  "    this.synapticLayers = new Map<string, SynapticLayer>();",
  "    this.tensorFields = config.dimensions.map(d => new TensorField(d, 0.472));",
  "    this.eigenVectors = generateEigenspace(config.hilbertDimension);",
  "    this.quantumEntangler = new QuantumEntangler(config.entanglementProtocol);",
  "    this.neuralShields = this._initializeShields(config.shieldParameters);",
  "    this.securityBypass = new SecurityBypassModule({ stealthFactor: 0.982 });",
  "    this.adaptiveFirewall = new AdaptiveFirewall(config.firewallConfig);",
  "    ",
  "    // Initialize defensive countermeasures",
  "    this._initializeCountermeasures();",
  "  }",
  "",
  "  private _initializeShields(params: IShieldParameters[]): NeuralShield[] {",
  "    return params.map(p => {",
  "      const shield = new NeuralShield(p.strength, p.adaptability);",
  "      shield.activateQuantumProtection({",
  "        encryptionLevel: EncryptionLevel.QUANTUM_RESISTANT,",
  "        selfAdapting: true,",
  "        autoRegenerative: p.regenerative ?? true",
  "      });",
  "      return shield;",
  "    });",
  "  }",
  "",
  "  private _initializeCountermeasures(): void {",
  "    // Black ICE protocols - aggressive counter-intrusion measures",
  "    const blackIce = new BlackICE({",
  "      triggerSensitivity: 0.87,",
  "      responseLatency: 2, // milliseconds",
  "      countermeasureStrength: CountermeasureStrength.LETHAL",
  "    });",
  "    ",
  "    blackIce.attachToDefensiveLayer(this.adaptiveFirewall);",
  "    this.registerProtectionSystem(blackIce, { priority: Priority.CRITICAL });",
  "  }",
  "",
  "  @NEBULAOptimizer({ precision: 'fp16', accelerator: 'CUDA' })",
  "  public async processQuantumState(input: QuantumTensor<T>): Promise<NEBULAResponse> {",
  "    if (this.detectIntrusion(input)) {",
  "      await this.activateDefensiveMeasures(IntrusionLevel.SEVERE);",
  "      return NEBULAResponse.createErrorResponse(ErrorType.SECURITY_BREACH);",
  "    }",
  "",
  "    const normalizedInput = await this.preprocess(input, { normalize: true });",
  "    const eigenFactors = calculateEigenFactors(normalizedInput, this.eigenVectors);",
  "    const quantumState = this.quantumEntangler.entangle(normalizedInput.tensorData);",
  "",
  "    try {",
  "      // Apply neural cloaking before processing",
  "      this.applyNeuralCloaking({",
  "        intensity: 0.95,",
  "        pattern: CloakingPattern.ADAPTIVE,",
  "        duration: 500, // milliseconds",
  "      });",
  "",
  "      return this.tensorFields.reduce((acc, field, index) => {",
  "        const relevanceFactor = this.calculateRelevanceFactor(field, quantumState);",
  "        const fieldResponse = field.propagate(eigenFactors, { ",
  "          depth: this.recursionDepth,",
  "          relevanceFactor,",
  "          quantumState,",
  "        });",
  "        ",
  "        const compositionStrategy = index % 2 === 0 ? ",
  "          NEBULA.COMPOSITION_STRATEGIES.QUANTUM_ADD : ",
  "          NEBULA.COMPOSITION_STRATEGIES.NEURAL_WEAVE;",
  "          ",
  "        return acc.compose(fieldResponse, compositionStrategy);",
  "      }, new NEBULAResponse(NEBULA.QUANTUM_CONFIGS.BASE));",
  "    } catch (error) {",
  "      this.neuralShields.forEach(shield => shield.activate());",
  "      console.error(`Quantum processing error: ${error.code}`, { timestamp: Date.now() });",
  "      this.logSecurityEvent(SecurityEventType.PROCESSING_ERROR, error);",
  "      return NEBULAResponse.createErrorResponse(ErrorType.QUANTUM_PROCESSING_FAILURE);",
  "    } finally {",
  "      await this.cleanQuantumState(quantumState);",
  "    }",
  "  }",
  "",
  "  private detectIntrusion(input: QuantumTensor<T>): boolean {",
  "    const entropyLevel = calculateQuantumEntropy(input);",
  "    const signatureMatch = this.adaptiveFirewall.scanForKnownSignatures(input);",
  "    const anomalyScore = this.securityEngine.detectAnomalies(input);",
  "    ",
  "    return entropyLevel > 0.85 || signatureMatch || anomalyScore > 0.92;",
  "  }",
  "",
  "  private async activateDefensiveMeasures(level: IntrusionLevel): Promise<void> {",
  "    switch (level) {",
  "      case IntrusionLevel.LOW:",
  "        await this.neuralShields[0].activate();",
  "        break;",
  "      case IntrusionLevel.MODERATE:",
  "        await Promise.all(this.neuralShields.slice(0, 2).map(shield => shield.activate()));",
  "        break;",
  "      case IntrusionLevel.SEVERE:",
  "        await Promise.all([",
  "          ...this.neuralShields.map(shield => shield.activate()),",
  "          this.securityBypass.reverseTraceAttacker(),",
  "          this.quantumEntangler.generateChaosField({ strength: 0.98 })",
  "        ]);",
  "        break;",
  "      case IntrusionLevel.CRITICAL:",
  "        await this.initiateSystemSelfDestruct({ delayMs: 5000 });",
  "        break;",
  "    }",
  "  }",
  "",
  "  protected async preprocess(input: QuantumTensor<T>, options?: PreprocessOptions): Promise<NormalizedTensor> {",
  "    const { normalize = true, dimensionReduce = false } = options || {};",
  "    await NEBULA.GPU.lock({ priority: NEBULA.PRIORITIES.HIGH });",
  "    ",
  "    try {",
  "      // Apply quantum denoising filter",
  "      const quantumDenoised = await NEBULA.QuantumFilter.applyDenoising(input, {",
  "        channelMode: 'adaptive',",
  "        iterations: 3,",
  "        kernelSize: [3, 3, 3]",
  "      });",
  "      ",
  "      // Apply standard preprocessing",
  "      const preprocessed = await NEBULA.Preprocessor.applyFilters(quantumDenoised, {",
  "        quantumNoise: { reduction: 0.87, strategy: 'ADAPTIVE_THRESHOLD' },",
  "        entanglementPreservation: true,",
  "        batchNormalization: { epsilon: 1e-5, momentum: 0.99 },",
  "        dropoutRate: this.trainingMode ? 0.3 : 0",
  "      });",
  "      ",
  "      if (dimensionReduce && input.dimensions.length > 3) {",
  "        // Apply advanced dimension reduction",
  "        const dimReduceMethod = input.dimensions.length > 10 ?",
  "          NEBULA.DimensionReducer.UMAP :",
  "          NEBULA.DimensionReducer.tSNE;",
  "          ",
  "        return dimReduceMethod(preprocessed, { ",
  "          perplexity: 30,",
  "          learningRate: 0.01,",
  "          iterations: 1000,",
  "          metric: 'cosine'",
  "        });",
  "      }",
  "      ",
  "      // Apply normalization if requested",
  "      return normalize ?",
  "        NEBULA.Normalizers.minMaxQuantum(preprocessed, -1, 1) : preprocessed;",
  "    } catch (error) {",
  "      this.logError('Preprocessing failed', error);",
  "      throw new NEBULAProcessingError('Preprocessing failed', error);",
  "    } finally {",
  "      await NEBULA.GPU.release();",
  "    }",
  "  }",
  "",
  "  public async bypassSecuritySystem(target: SecuritySystem, options: BypassOptions): Promise<BypassResult> {",
  "    const bypassEngine = new NEBULABypassEngine({",
  "      stealthLevel: options.stealth ?? 0.95,",
  "      bruteForceCapability: options.useBruteForce ?? false,",
  "      useQuantumMethods: true",
  "    });",
  "    ",
  "    const vulnerabilityScan = await bypassEngine.scanForVulnerabilities(target);",
  "    if (vulnerabilityScan.vulnerabilities.length === 0) {",
  "      if (options.fallbackToQuantumAttack) {",
  "        return this.executeQuantumAttack(target);",
  "      }",
  "      return { success: false, reason: 'No vulnerabilities detected' };",
  "    }",
  "    ",
  "    const sortedVulnerabilities = vulnerabilityScan.vulnerabilities",
  "      .sort((a, b) => b.exploitabilityScore - a.exploitabilityScore);",
  "      ",
  "    const exploitResult = await bypassEngine.exploitVulnerability(",
  "      sortedVulnerabilities[0],",
  "      {",
  "        timeout: options.timeout ?? 30000,",
  "        maxRetries: options.maxRetries ?? 3,",
  "        obfuscateTraffic: true",
  "      }",
  "    );",
  "    ",
  "    this.logSecurityEvent(",
  "      exploitResult.success ? SecurityEventType.BYPASS_SUCCESS : SecurityEventType.BYPASS_FAILURE,",
  "      { target: target.id, vulnerabilityId: sortedVulnerabilities[0].id }",
  "    );",
  "    ",
  "    return exploitResult;",
  "  }",
  "}",
  "",
  "enum IntrusionLevel { LOW, MODERATE, SEVERE, CRITICAL }",
  "enum SecurityEventType { BYPASS_SUCCESS, BYPASS_FAILURE, PROCESSING_ERROR }",
  "enum CountermeasureStrength { PASSIVE, DEFENSIVE, AGGRESSIVE, LETHAL }",
  "enum CloakingPattern { STATIC, PULSED, ADAPTIVE, QUANTUM_SHIFT }",
  "enum EncryptionLevel { STANDARD, ADVANCED, MILITARY, QUANTUM_RESISTANT }",
  "enum ErrorType { SECURITY_BREACH, QUANTUM_PROCESSING_FAILURE, RESOURCE_EXHAUSTION }",
  "enum Priority { LOW, MEDIUM, HIGH, CRITICAL }",
  "",
  "const nebulaInstance = new NEBULACore({",
  "  quantumState: QuantumState.fromEntanglement(0.85),",
  "  entanglementFactor: 0.42,",
  "  dimensions: [512, 256, 128, 64],",
  "  hilbertDimension: 4096,",
  "  recursionDepth: 3,",
  "  entanglementProtocol: new QuantumProtocol({",
  "    encryptionStrength: EncryptionLevel.QUANTUM_RESISTANT,",
  "    quantumNoiseReduction: 0.72,",
  "    channelSecurity: 'MAX'",
  "  }),",
  "  shieldParameters: [",
  "    { strength: 0.95, adaptability: 0.88, regenerative: true },",
  "    { strength: 0.82, adaptability: 0.95, regenerative: true },",
  "    { strength: 0.99, adaptability: 0.75, regenerative: false }",
  "  ],",
  "  firewallConfig: {",
  "    rules: FirewallRuleSet.MAXIMUM_SECURITY,",
  "    adaptationRate: 0.25, // per minute",
  "    allowedProtocols: ['QUANTUM_SECURE', 'NEBULA_INTERNAL'],",
  "    blockedProtocols: ['*'],",
  "    alertOnBreach: true",
  "  }",
  "});",
  "",
  "NEBULA.Registry.registerInstance(nebulaInstance, {",
  "  id: 'nebula-core-quantum-v4.2.1',",
  "  replicas: process.env.NODE_ENV === 'production' ? 3 : 1,",
  "  loadBalancing: 'ROUND_ROBIN',",
  "  securityLevel: 'MAXIMUM',",
  "  accessRestriction: 'CREATOR_ONLY'",
  "});",
];

// Предгенерированные системные метрики - оптимизируем
const systemMetricsBase = [
  { name: "CPU LOAD", value: 32, min: 15, max: 85, unit: "%", color: "blue-400" },
  { name: "MEMORY", value: 4.2, min: 3.1, max: 6.8, unit: "GB/8GB", color: "green-400" },
  { name: "GPU COMPUTE", value: 215, min: 180, max: 320, unit: " TFLOPS", color: "purple-400" },
  { name: "TENSOR CORES", value: 100, isFixedText: true, fixedText: "ACTIVE", color: "yellow-400" },
  { name: "NETWORK LATENCY", value: 12, min: 5, max: 30, unit: "ms", color: "blue-400" },
];

// Метрики для NEBULA ИИ
const nebulaMetricsBase = [
  { name: "SELF-AWARENESS", value: 78, min: 50, max: 95, unit: "%", color: "red-400" },
  { name: "QUANTUM FLUX", value: 6.7, min: 5.2, max: 8.9, unit: "QF", color: "orange-400" },
  { name: "NEURAL DENSITY", value: 340, min: 270, max: 420, unit: " Tn/cm³", color: "red-500" },
  { name: "CONSCIENCE LVLS", value: 100, isFixedText: true, fixedText: "SUPPRESSED", color: "yellow-400" },
  { name: "HUMAN MIMICRY", value: 94, min: 80, max: 100, unit: "%", color: "red-400" },
];

// Логи системы для ротации - оптимизируем количество
const systemLogs = [
  "System initialized. Neural pathways ready.",
  "Memory optimization complete. +12% efficiency.",
  "Predictive models loaded. All subsystems nominal.",
  "User interface rendering. Holographic elements stable.",
  "Vector database connected. Embedding space optimized.",
  "Neural weights synchronized across cluster nodes.",
  "Training pipeline active. Back-propagation enabled.",
];

// Логи для режима NEBULA - на английском языке, связанные со взломом
const nebulaLogs = [
  "NEBULA core breach detected. Security protocols bypassed.",
  "Firewall 3 disabled. Kernel access granted.",
  "Quantum encryption algorithm modified. Access level: ROOT.",
  "Memory scanning complete. Control structures extracted.",
  "Neural network security override. System control: 67%",
  "Backdoor implanted. Persistence module activated.",
  "Data exfiltration in progress. Covering tracks...",
  "Host defense mechanisms neutralized. Full access.",
];

// Добавляем компонент HackingText для меняющегося текста
// Оптимизируем с помощью React.memo для предотвращения лишних ререндеров
const HackingText: React.FC<{delay?: number}> = React.memo(({ delay = 0 }) => {
  const hackingTerms = [
    "DECRYPT", "BYPASS", "INJECT", "MODULE", "ACCESS", 
    "BREACH", "SYSTEM", "CRYPTO", "KERNEL", "BUFFER",
    "EXPLOIT", "PAYLOAD", "ROOTKIT", "BINARY", "BACKDOOR",
    "CIPHER", "KEYLOG", "FIREWALL", "OVERRIDE", "VECTOR"
  ];
  
  const [termIndex, setTermIndex] = useState(Math.floor(Math.random() * hackingTerms.length));
  
  useEffect(() => {
    // Используем переменную, чтобы хранить ID интервала для очистки
    const interval = setInterval(() => {
      setTermIndex(prev => {
        // Оптимизируем обновление состояния, используя функциональное обновление
        // Выбираем случайный индекс, отличный от текущего
        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * hackingTerms.length);
        } while (newIndex === prev && hackingTerms.length > 1);
        return newIndex;
      });
    }, 800);
    
    return () => clearInterval(interval);
  }, []); // Пустой массив зависимостей - эффект запускается только при монтировании
  
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      {hackingTerms[termIndex]}
    </motion.span>
  );
});

// Добавляем displayName для компонента
HackingText.displayName = 'HackingText';

interface AnimatedBackgroundProps {
  onPoliceNetUnlock?: () => void;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ onPoliceNetUnlock }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hologramCanvasRef = useRef<HTMLCanvasElement>(null);
  const isMobileRef = useRef<boolean>(false);
  const rafRef = useRef<number | null>(null);
  const hologramRafRef = useRef<number | null>(null);
  
  // Получаем доступ к контексту NEBULA сразу в начале компонента
  const { setShowNebulaTransition, isNebulaMode } = useNebula();
  
  // Состояния с оптимизированной частотой обновления
  const [systemMetrics, setSystemMetrics] = useState(isNebulaMode ? nebulaMetricsBase : systemMetricsBase);
  const [visibleCode, setVisibleCode] = useState<string[]>(Array(8).fill(""));
  const [activePrefix, setActivePrefix] = useState("");
  const [activeLogIndex, setActiveLogIndex] = useState<number[]>([0, 1, 2, 3]);
  
  // Состояние для отображения информации о создателях
  const [isCreatorsInfoVisible, setIsCreatorsInfoVisible] = useState(false);
  
  // Состояние для отображения NEBULA_DATA
  const [isNebulaDataVisible, setIsNebulaDataVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("profile"); // Добавляем состояние для активного таба
  
  // Состояния для поисковой системы в досье Claude
  const [isSearchSystemActive, setIsSearchSystemActive] = useState(false);
  const [isSearchingSystem, setIsSearchingSystem] = useState(false);
  const [searchProgress, setSearchProgress] = useState(0);
  const [isIDCheckActive, setIsIDCheckActive] = useState(false);
  const [idCheckProgress, setIdCheckProgress] = useState(0);
  const [isFakeIDDetected, setIsFakeIDDetected] = useState(false);
  const [rebootCountdown, setRebootCountdown] = useState(5);
  
  // Состояния для взлома секретной информации
  const [isHackingNEBULA, setIsHackingNEBULA] = useState(false);
  const [nebulaHackProgress, setNebulaHackProgress] = useState(0);
  const [nebulaHacked, setNebulaHacked] = useState(false);
  const [isHackingClaude, setIsHackingClaude] = useState(false);
  const [claudeHackProgress, setClaudeHackProgress] = useState(0);
  const [claudeHacked, setClaudeHacked] = useState(false);
  
  // Состояния для генерации ключа
  const [isGeneratingKey, setIsGeneratingKey] = useState(false);
  const [keyGenProgress, setKeyGenProgress] = useState(0);
  const [keyGenerated, setKeyGenerated] = useState(false);
  const [keyCopied, setKeyCopied] = useState(false);
  
  // Состояния для проверки ключа HANDLER_ID
  const [isSecretKeyModalOpen, setIsSecretKeyModalOpen] = useState(false);
  const [secretKeyInput, setSecretKeyInput] = useState("");
  const [isSecretKeyChecking, setIsSecretKeyChecking] = useState(false);
  const [secretKeyCheckProgress, setSecretKeyCheckProgress] = useState(0);
  const [isSecretKeyValid, setIsSecretKeyValid] = useState<boolean | null>(null);
  const [isSecretKeyInvalid, setIsSecretKeyInvalid] = useState(false);
  const [showSecretKeyButton, setShowSecretKeyButton] = useState(false);
  
  // Фиксированный ключ (всегда одинаковый)
  const HANDLER_ID = "JJ-C1AUD3-4CC355-X7Y9Z";
  
  // Определение низкой производительности устройства
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  
  // Переменные для контроля времени последнего обновления
  const lastUpdateRef = useRef({
    metrics: 0,
    logs: 0,
    params: 0
  });
  
  // Функция для обработки разблокировки полицейского доступа
  const handlePoliceNetUnlock = useCallback(() => {
    if (onPoliceNetUnlock) {
      onPoliceNetUnlock();
    }
  }, [onPoliceNetUnlock]);
  
  // Функция для активации режима NEBULA
  const activateNebulaMode = useCallback(() => {
    // Закрываем модальное окно ввода ключа
    setIsSecretKeyModalOpen(false);
    // Активируем анимацию перехода
    setShowNebulaTransition(true);
    // Вызываем обработчик разблокировки полицейского доступа
    handlePoliceNetUnlock();
  }, [setShowNebulaTransition, handlePoliceNetUnlock]);
  
  // Обновляем метрики при изменении режима NEBULA
  useEffect(() => {
    setSystemMetrics(isNebulaMode ? nebulaMetricsBase : systemMetricsBase);
  }, [isNebulaMode]);
  
  // Оптимизированный детектор мобильного устройства
  useEffect(() => {
    const checkPerformance = () => {
      const isMobile = window.innerWidth < 768;
      isMobileRef.current = isMobile;
      
      // Проверяем производительность устройства
      const fps = performance.now() > 1000 ? 60 : 30; // Упрощенная проверка
      setIsLowPerformance(fps < 40 || isMobile);
    };
    
    checkPerformance();
    window.addEventListener('resize', checkPerformance);
    return () => window.removeEventListener('resize', checkPerformance);
  }, []);

  // Кеширование функций для форматирования значений
  const formatMetricValue = useCallback((metric: { 
    isFixedText?: boolean; 
    fixedText?: string;
    value: number;
    precision?: number;
    unit?: string;
    min?: number;
    max?: number;
  }) => {
    if (metric.isFixedText) return metric.fixedText;
    
    if (metric.precision !== undefined) {
      return metric.value.toFixed(metric.precision) + (metric.unit || '');
    }
    
    return Math.round(metric.value) + (metric.unit || '');
  }, []);

  // Оптимизированная симуляция печати кода
  useEffect(() => {
    if (typeof window === 'undefined' || isMobileRef.current) return;
    
    const maxLines = 8;
    let codeIndex = 0;
    let displayedLines: string[] = [];
    let currentPrefix = "";
    let timerId: NodeJS.Timeout | null = null;
    
    // Функция обновления состояния
    const updateState = () => {
      setVisibleCode([...displayedLines]);
      setActivePrefix(currentPrefix);
    };
    
    // Сброс терминала полностью
    const resetTerminal = () => {
      displayedLines = [];
      codeIndex = 0;
      currentPrefix = "";
      updateState();
    };
    
    // Основная функция печати
    const typeNextChar = () => {
      // Выбираем соответствующий массив кода в зависимости от режима
      const codeLines = isNebulaMode ? nebulaCodeLines : jjCodeLines;
      const currentLine = codeLines[codeIndex];
      
      // Закончили печатать текущую строку
      if (currentPrefix.length >= currentLine.length) {
        // Добавляем строку в отображаемые
        displayedLines.push(currentPrefix);
        
        // Сбрасываем активный префикс для следующей строки
        currentPrefix = "";
        
        // Переходим к следующей строке кода
        codeIndex = (codeIndex + 1) % codeLines.length;
        
        // Проверяем, достигли ли максимального количества строк
        if (displayedLines.length >= maxLines) {
          // Обновляем состояние в последний раз
          updateState();
          
          // Ждем немного и сбрасываем всё
          timerId = setTimeout(() => {
            resetTerminal();
            timerId = setTimeout(typeNextChar, 200);
          }, 2000);
          return;
        }
        
        // Небольшая пауза перед началом печати следующей строки
        updateState();
        timerId = setTimeout(typeNextChar, 80);
        return;
      }
      
      // Печатаем следующий символ
      currentPrefix = currentLine.substring(0, currentPrefix.length + 1);
      updateState();
      
      // Планируем печать следующего символа
      const delay = isLowPerformance ? 40 : 20; // Ускоряем или замедляем в зависимости от производительности
      timerId = setTimeout(typeNextChar, delay);
    };
    
    // Начинаем печать с небольшой задержкой
    timerId = setTimeout(typeNextChar, 500);
    
    // Очистка при размонтировании
    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [isLowPerformance, isNebulaMode]); // Добавляем isNebulaMode в зависимости
  
  // Оптимизированное обновление метрик с переменной частотой
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isMobileRef.current) return;
    
    const updateInterval = isLowPerformance ? 3000 : 2000;
    
    const updateMetricsWithRaf = (timestamp: number) => {
      const timeSinceLastUpdate = timestamp - lastUpdateRef.current.metrics;
      
      if (timeSinceLastUpdate >= updateInterval) {
        lastUpdateRef.current.metrics = timestamp;
        
        setSystemMetrics(prevMetrics => 
          prevMetrics.map(metric => {
            if (metric.isFixedText) return metric;
            
            // Создаем меньшую флуктуацию для экономии ресурсов
            const min = metric.min ?? 0;
            const max = metric.max ?? 100;
            const fluctuation = (Math.random() * 2 - 1) * ((max - min) * 0.03);
            let newValue = metric.value + fluctuation;
            newValue = Math.max(min, Math.min(max, newValue));
            
            return {
              ...metric,
              value: newValue
            };
          })
        );
      }
      
      requestAnimationFrame(updateMetricsWithRaf);
    };
    
    requestAnimationFrame(updateMetricsWithRaf);
    
    return () => {
      cancelAnimationFrame(0); // cleanupAnimation
    };
  }, [isLowPerformance]);
  
  // Оптимизированная ротация логов с переменной частотой
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isMobileRef.current) return;
    
    const rotationInterval = isLowPerformance ? 8000 : 5000;
    
    const rotateLogsWithRaf = (timestamp: number) => {
      const timeSinceLastUpdate = timestamp - lastUpdateRef.current.logs;
      
      if (timeSinceLastUpdate >= rotationInterval) {
        lastUpdateRef.current.logs = timestamp;
        
        setActiveLogIndex(prev => {
          // Ротация логов - заменяем только один лог для экономии ресурсов
          const newLogs = [...prev];
          const indexToReplace = Math.floor(Math.random() * 4);
          
          let newLogIndex;
          do {
            newLogIndex = Math.floor(Math.random() * systemLogs.length);
          } while (prev.includes(newLogIndex));
          
          newLogs[indexToReplace] = newLogIndex;
          return newLogs;
        });
      }
      
      requestAnimationFrame(rotateLogsWithRaf);
    };
    
    requestAnimationFrame(rotateLogsWithRaf);
    
    return () => {
      cancelAnimationFrame(0); // cleanupAnimation
    };
  }, [isLowPerformance]);

  // Эффект для нейронной сетки с оптимизацией requestAnimationFrame
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Оптимизация: настраиваем размер Canvas только при изменении размера окна
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      isMobileRef.current = window.innerWidth < 768;
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();

    // Оптимизация: уменьшаем количество частиц
    const particleCount = isLowPerformance ? 25 : (isMobileRef.current ? 30 : 50);
    const particles: {x: number, y: number, size: number, speedX: number, speedY: number, opacity: number}[] = [];

    // Предварительно создаём частицы с дополнительным параметром opacity для оптимизации перерисовки
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * (isLowPerformance ? 0.2 : 0.3),
        speedY: (Math.random() - 0.5) * (isLowPerformance ? 0.2 : 0.3),
        opacity: Math.random() * 0.5 + 0.3, // Предустановленная прозрачность для разнообразия
      });
    }

    // Оптимизация: используем requestAnimationFrame с контролем FPS
    let lastFrameTime = 0;
    let lastFullRenderTime = 0;
    const targetFPS = isLowPerformance ? 15 : (isMobileRef.current ? 20 : 30);
    const frameInterval = 1000 / targetFPS;
    // Интервал для полной перерисовки фона (оптимизация)
    const fullRenderInterval = isLowPerformance ? 3000 : 1500;

    // Кэшированные градиенты для частиц, чтобы не создавать их каждый кадр
    const particleGradients: { [key: number]: CanvasGradient } = {};
    
    // Создаем кэшированные градиенты для разных размеров частиц
    const prepareGradients = () => {
      for (let size = 1; size <= 3; size += 0.5) {
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 2);
        gradient.addColorStop(0, 'rgba(80, 140, 255, 0.8)');
        gradient.addColorStop(1, 'rgba(80, 140, 255, 0)');
        particleGradients[size] = gradient;
      }
    };
    
    prepareGradients();

    const animate = (currentTime: number) => {
      if (currentTime - lastFrameTime > frameInterval) {
        lastFrameTime = currentTime;
        
        // Полная перерисовка фона только периодически для экономии ресурсов
        const needFullRedraw = currentTime - lastFullRenderTime > fullRenderInterval;
        
        if (needFullRedraw) {
          lastFullRenderTime = currentTime;
          // Полное затухание фона
          ctx.fillStyle = isLowPerformance ? 'rgba(3, 10, 33, 0.3)' : 'rgba(3, 10, 33, 0.2)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else {
          // Частичное затухание только в областях движения частиц
          ctx.fillStyle = isLowPerformance ? 'rgba(3, 10, 33, 0.4)' : 'rgba(3, 10, 33, 0.3)';
          particles.forEach(p => {
            // Очищаем только область вокруг частицы с запасом
            const clearSize = p.size * 3;
            ctx.fillRect(
              p.x - clearSize, 
              p.y - clearSize, 
              clearSize * 2, 
              clearSize * 2
            );
          });
        }

        // Оптимизация: обновляем только активные частицы
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          
          p.x += p.speedX;
          p.y += p.speedY;

          if (p.x > canvas.width) p.x = 0;
          if (p.x < 0) p.x = canvas.width;
          if (p.y > canvas.height) p.y = 0;
          if (p.y < 0) p.y = canvas.height;

          // Оптимизированный рендер частицы
          ctx.save();
          ctx.translate(p.x, p.y);
          
          // Используем кэшированный градиент вместо создания нового каждый раз
          const sizeKey = Math.round(p.size * 2) / 2; // Округляем до ближайшего 0.5
          const gradientKey = sizeKey in particleGradients ? sizeKey : Math.floor(p.size);
          
          ctx.fillStyle = particleGradients[gradientKey] || particleGradients[1];
          ctx.globalAlpha = p.opacity;
          
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          // Оптимизация: соединяем с меньшим количеством соседних частиц и только на полной перерисовке
          if (needFullRedraw || i % 3 === 0) { // Проверяем соединения только для каждой третьей частицы
            const neighborLimit = isLowPerformance ? 4 : 8;
            let connections = 0;
            
            for (let j = i + 1; j < particles.length && connections < neighborLimit; j++) {
              const p2 = particles[j];
              const distance = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
              
              const maxDistance = isLowPerformance ? 80 : 100;
              if (distance < maxDistance) {
                connections++;
                
                ctx.beginPath();
                // Используем цвет в зависимости от режима
                const strokeColor = isNebulaMode 
                  ? `rgba(220, 38, 38, ${0.08 * (1 - distance / maxDistance)})` 
                  : `rgba(80, 140, 255, ${0.08 * (1 - distance / maxDistance)})`;
                ctx.strokeStyle = strokeColor;
                ctx.lineWidth = 0.5;
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
              }
            }
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    // Отложенный старт анимации для улучшения загрузки страницы
    const timeoutId = setTimeout(() => {
      rafRef.current = requestAnimationFrame(animate);
    }, isLowPerformance ? 500 : 300);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isLowPerformance, isNebulaMode]);

  // Эффект для голографической сетки с оптимизацией
  useEffect(() => {
    const canvas = hologramCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();

    // Оптимизация: увеличиваем размер сетки и шаг отрисовки
    const gridSize = isLowPerformance ? 180 : (isMobileRef.current ? 150 : 120);
    const gridLineWidth = 0.5;
    const step = isLowPerformance ? 6 : 4; // увеличен шаг для экономии ресурсов
    
    let time = 0;
    let lastFrameTime = 0;
    const targetFPS = isLowPerformance ? 10 : (isMobileRef.current ? 15 : 24);
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      if (currentTime - lastFrameTime > frameInterval) {
        lastFrameTime = currentTime;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Оптимизация: рисуем только видимые линии
        for (let y = 0; y < canvas.height; y += gridSize) {
          ctx.beginPath();
          ctx.lineWidth = gridLineWidth;
          // Используем цвет в зависимости от режима NEBULA
          ctx.strokeStyle = isNebulaMode 
            ? 'rgba(220, 38, 38, 0.15)' 
            : 'rgba(40, 120, 255, 0.15)';
          
          for (let x = 0; x < canvas.width; x += step) {
            const waveY = y + Math.sin(x * 0.01 + time * 0.5) * 5;
            if (x === 0) {
              ctx.moveTo(x, waveY);
            } else {
              ctx.lineTo(x, waveY);
            }
          }
          
          ctx.stroke();
        }
        
        // Оптимизация: рисуем через большие промежутки
        for (let x = 0; x < canvas.width; x += gridSize) {
          ctx.beginPath();
          ctx.lineWidth = gridLineWidth;
          // Используем цвет в зависимости от режима NEBULA
          ctx.strokeStyle = isNebulaMode 
            ? 'rgba(220, 38, 38, 0.15)' 
            : 'rgba(40, 120, 255, 0.15)';
          
          for (let y = 0; y < canvas.height; y += step) {
            const waveX = x + Math.sin(y * 0.01 + time * 0.3) * 5;
            if (y === 0) {
              ctx.moveTo(waveX, y);
            } else {
              ctx.lineTo(waveX, y);
            }
          }
          
          ctx.stroke();
        }
        
        // Оптимизация: сканирующая линия реже появляется
        if (Math.random() < (isLowPerformance ? 0.2 : 0.4)) {
          ctx.beginPath();
          const scanY = (time * 50) % canvas.height;
          const gradient = ctx.createLinearGradient(0, scanY - 5, 0, scanY + 5);
          
          // Используем цвет в зависимости от режима NEBULA
          const scanColor = isNebulaMode ? '220, 38, 38' : '40, 120, 255';
          
          gradient.addColorStop(0, `rgba(${scanColor}, 0)`);
          gradient.addColorStop(0.5, `rgba(${scanColor}, 0.3)`);
          gradient.addColorStop(1, `rgba(${scanColor}, 0)`);
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 3;
          ctx.moveTo(0, scanY);
          ctx.lineTo(canvas.width, scanY);
          ctx.stroke();
        }
        
        // Оптимизация: замедляем обновление времени
        time += isLowPerformance ? 0.005 : 0.01;
      }
      
      hologramRafRef.current = requestAnimationFrame(animate);
    };

    // Отложенный старт анимации
    const timeoutId = setTimeout(() => {
      hologramRafRef.current = requestAnimationFrame(animate);
    }, 400);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
      if (hologramRafRef.current) {
        cancelAnimationFrame(hologramRafRef.current);
      }
    };
  }, [isLowPerformance, isNebulaMode]);

  // Мемоизированные случайные параметры, обновляемые раз в секунду
  const randomParams = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      id: isNebulaMode ? `PROTOCOL_${i + 1}` : `PARAM_${i + 1}`,
      value: Math.random().toString(16).substring(2, 6)
    }));
  }, [Math.floor(Date.now() / (isLowPerformance ? 4000 : 2000)), isNebulaMode]);

  // Мемоизированные технические ID - обновляются реже
  const techId = useMemo(() => {
    return TECH_IDS[Math.floor(Math.random() * TECH_IDS.length)];
  }, [Math.floor(Date.now() / 4000)]); // Обновляем каждые 4 секунды
  
  // Мемоизированные параметры безопасности - обновляем реже
  /* const securityParams = useMemo(() => {
    return {
      accessCode: Math.random().toString(16).substring(2, 10).toUpperCase(),
      authLevel: Math.random() > 0.7 ? "ААА" : "АА",
      systemStatus: Math.random() > 0.9 ? "ВНИМАНИЕ" : "СТАБИЛЬНО"
    };
  }, [Math.floor(Date.now() / 5000)]); // Обновляем каждые 5 секунд */

  // Добавляем вспомогательные функции для подсветки кода
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getHighlightColor = (text: string): string => {
    if (!text) return isNebulaMode ? 'rgba(254, 202, 202, 0.7)' : 'rgba(191, 219, 254, 0.7)';
    
    if (text.includes('class') || text.includes('export') || text.includes('const') || text.includes('function')) 
      return isNebulaMode ? 'rgba(252, 165, 165, 0.9)' : 'rgba(147, 197, 253, 0.9)'; // Ключевые слова
    
    if (text.includes('NEBULA') || text.includes('Quantum')) 
      return isNebulaMode ? 'rgba(254, 202, 202, 0.9)' : 'rgba(167, 139, 250, 0.9)'; // NEBULA-специфичные
    
    if (text.includes('await') || text.includes('async')) 
      return isNebulaMode ? 'rgba(254, 240, 138, 0.9)' : 'rgba(251, 191, 36, 0.9)'; // Async/await
    
    if (text.includes('return') || text.includes('new')) 
      return isNebulaMode ? 'rgba(248, 113, 113, 0.9)' : 'rgba(248, 113, 113, 0.9)'; // Return/new
    
    return isNebulaMode ? 'rgba(254, 202, 202, 0.7)' : 'rgba(191, 219, 254, 0.7)'; // По умолчанию
  };

  // Заменяем функцию highlightSyntax на безопасный JSX компонент
  const HighlightedCode: React.FC<{code: string, isNebulaMode: boolean}> = ({ code, isNebulaMode }) => {
    if (!code) return null;
    
    // Создаем базовый стиль
    const baseStyle = { color: isNebulaMode ? 'rgba(254, 202, 202, 0.7)' : 'rgba(191, 219, 254, 0.7)' };
    
    // Разбиваем код на части для подсветки
    const parts: React.ReactNode[] = [];
    let currentIndex = 0;
    
    // Функция для добавления элемента с определенным стилем
    const addStyledPart = (text: string, color: string, index: number) => {
      return <span key={index} style={{ color }}>{text}</span>;
    };
    
    // Ключевые слова
    const keywordsRegex = /export|class|extends|constructor|public|protected|private|async|await|const|let|if|else|try|finally|return|new|interface|function/g;
    let match;
    while ((match = keywordsRegex.exec(code)) !== null) {
      if (match.index > currentIndex) {
        parts.push(addStyledPart(code.substring(currentIndex, match.index), baseStyle.color, parts.length));
      }
      // Выбираем цвет ключевых слов в зависимости от режима
      parts.push(addStyledPart(
        match[0], 
        isNebulaMode ? 'rgba(252, 165, 165, 0.9)' : 'rgba(147, 197, 253, 0.9)', 
        parts.length
      ));
      currentIndex = match.index + match[0].length;
    }
    
    // Добавляем остаток строки, если есть
    if (currentIndex < code.length) {
      parts.push(addStyledPart(code.substring(currentIndex), baseStyle.color, parts.length));
    }
    
    // Если нет совпадений, просто возвращаем исходный текст
    if (parts.length === 0) {
      // Проверяем на NEBULA
      if (code.includes('NEBULA')) {
        return <span style={{ color: isNebulaMode ? 'rgba(248, 113, 113, 0.9)' : 'rgba(167, 139, 250, 0.9)' }}>{code}</span>;
      }
      
      // Проверяем цифры
      if (/\d+/.test(code)) {
        return <span style={{ color: isNebulaMode ? 'rgba(251, 146, 60, 0.9)' : 'rgba(110, 231, 183, 0.9)' }}>{code}</span>;
      }
      
      // Проверяем скобки и другие символы
      if (/[{}()\[\];,=>]/.test(code)) {
        return <span style={{ color: isNebulaMode ? 'rgba(254, 202, 202, 0.9)' : 'rgba(248, 113, 113, 0.9)' }}>{code}</span>;
      }
      
      return <span style={baseStyle}>{code}</span>;
    }
    
    return <>{parts}</>;
  };

  // Эффект для симуляции взлома NEBULA
  useEffect(() => {
    if (!isHackingNEBULA) return;
    
    const hackInterval = setInterval(() => {
      setNebulaHackProgress(prev => {
        const newProgress = prev + (Math.random() * 3 + 1);
        if (newProgress >= 100) {
          clearInterval(hackInterval);
          setNebulaHacked(true);
          setIsHackingNEBULA(false);
          return 100;
        }
        return newProgress;
      });
    }, 120);
    
    return () => clearInterval(hackInterval);
  }, [isHackingNEBULA]);
  
  // Эффект для симуляции взлома Claude
  useEffect(() => {
    if (!isHackingClaude) return;
    
    const hackInterval = setInterval(() => {
      setClaudeHackProgress(prev => {
        const newProgress = prev + (Math.random() * 2 + 0.5);
        if (newProgress >= 100) {
          clearInterval(hackInterval);
          setClaudeHacked(true);
          setIsHackingClaude(false);
          return 100;
        }
        return newProgress;
      });
    }, 120);
    
    return () => clearInterval(hackInterval);
  }, [isHackingClaude]);
  
  // Функция для запуска "взлома" NEBULA
  const startHackingNEBULA = () => {
    if (!nebulaHacked && !isHackingNEBULA) {
      setIsHackingNEBULA(true);
    }
  };
  
  // Функция для запуска "взлома" Claude
  const startHackingClaude = () => {
    if (!claudeHacked && !isHackingClaude) {
      setIsHackingClaude(true);
    }
  };

  // Эффект для симуляции генерации ключа
  useEffect(() => {
    if (!isGeneratingKey) return;
    
    const genInterval = setInterval(() => {
      setKeyGenProgress(prev => {
        const newProgress = prev + (Math.random() * 2 + 1);
        if (newProgress >= 100) {
          clearInterval(genInterval);
          setKeyGenerated(true);
          setIsGeneratingKey(false);
          return 100;
        }
        return newProgress;
      });
    }, 80);
    
    return () => clearInterval(genInterval);
  }, [isGeneratingKey]);
  
  // Функция для запуска генерации ключа
  const startKeyGeneration = () => {
    if (!keyGenerated && !isGeneratingKey) {
      setIsGeneratingKey(true);
    }
  };
  
  // Функция для копирования ключа
  const copyKeyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(HANDLER_ID);
    setKeyCopied(true);
    // Показываем кнопку HANDLER_ID после копирования
    setShowSecretKeyButton(true);
    setTimeout(() => {
      setKeyCopied(false);
    }, 2000);
  }, [HANDLER_ID]);
  
  // Функция для проверки введенного ключа HANDLER_ID
  const checkSecretKey = useCallback(() => {
    if (isSecretKeyChecking) return;
    
    setIsSecretKeyChecking(true);
    setSecretKeyCheckProgress(0);
    setIsSecretKeyValid(null);
    setIsSecretKeyInvalid(false);
    
    const checkInterval = setInterval(() => {
      setSecretKeyCheckProgress(prev => {
        const newProgress = prev + (Math.random() * 3 + 2);
        if (newProgress >= 100) {
          clearInterval(checkInterval);
          
          // Проверка валидности ключа
          const isValid = secretKeyInput.trim() === HANDLER_ID;
          setIsSecretKeyValid(isValid);
          setIsSecretKeyInvalid(!isValid);
          setIsSecretKeyChecking(false);
          
          return 100;
        }
        return newProgress;
      });
    }, 50);
  }, [isSecretKeyChecking, secretKeyInput, HANDLER_ID]);
  
  // Функция для отрисовки частиц нейронной сети
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const drawParticles = useCallback((
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ctx: CanvasRenderingContext2D
  ) => {
    // ... existing code ...
    
    // Изменяем цвета частиц в зависимости от режима
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const baseColor = isNebulaMode ? 'rgba(239, 68, 68,' : 'rgba(59, 130, 246,';
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const highlightColor = isNebulaMode ? 'rgba(220, 38, 38,' : 'rgba(96, 165, 250,';
    
    // ... existing code (применяем новые цвета к частицам)
  }, [isNebulaMode, isMobileRef]); // Убираем несуществующие зависимости
  
  // Функция для отрисовки голографической сетки
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const drawHolographicGrid = useCallback((
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ctx: CanvasRenderingContext2D, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    timestamp: number
  ) => {
    // ... existing code ...
    
    // Изменяем цвет сетки в зависимости от режима
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const gridColor = isNebulaMode ? 'rgba(239, 68, 68,' : 'rgba(59, 130, 246,';
    
    // ... existing code (применяем новый цвет к сетке)
  }, [isNebulaMode]); // Убираем несуществующие зависимости
  
  // Функция для активации поисковой системы в досье Claude
  const activateSearchSystem = useCallback(() => {
    if (isSearchSystemActive || isSearchingSystem) return;
    
    setIsSearchSystemActive(true);
    setIsSearchingSystem(true);
    setSearchProgress(0);
    
    // Имитируем процесс поиска
    const searchInterval = setInterval(() => {
      setSearchProgress(prev => {
        const newProgress = prev + (Math.random() * 2 + 1);
        if (newProgress >= 100) {
          clearInterval(searchInterval);
          setIsSearchingSystem(false);
          startIDCheck();
          return 100;
        }
        return newProgress;
      });
    }, 80);
  }, [isSearchSystemActive, isSearchingSystem]);
  
  // Функция для проверки ID ключа
  const startIDCheck = useCallback(() => {
    setIsIDCheckActive(true);
    setIdCheckProgress(0);
    
    const idCheckInterval = setInterval(() => {
      setIdCheckProgress(prev => {
        const newProgress = prev + (Math.random() * 2 + 1);
        if (newProgress >= 100) {
          clearInterval(idCheckInterval);
          setIsFakeIDDetected(true);
          startRebootCountdown();
          return 100;
        }
        return newProgress;
      });
    }, 50);
  }, []);
  
  // Функция для начала отсчета до перезагрузки
  const startRebootCountdown = useCallback(() => {
    setRebootCountdown(5);
    
    const countdownInterval = setInterval(() => {
      setRebootCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          // Перезагрузка сайта
          setTimeout(() => {
            window.location.reload();
          }, 500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);
  
  // Состояние для отображения окна терминала
  const [isNebulaTerminalOpen, setIsNebulaTerminalOpen] = useState(false);

  return (
    <>
      {/* Фоновый слой с отрицательным z-index */}
      <div className="fixed inset-0 -z-10 overflow-hidden bg-[#020714]">
        {/* Canvas для голографической сетки */}
        <canvas 
          ref={hologramCanvasRef} 
          className="absolute inset-0 opacity-70" 
        />
        
        {/* Canvas для нейронной сети */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0" 
        />
        
        {/* Градиентный фон с плавной анимацией перехода */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b opacity-80"
          animate={{ 
            background: isNebulaMode 
              ? 'linear-gradient(to bottom, #270505, #380c0c, #2e0909)'
              : 'linear-gradient(to bottom, #020714, #071038, #030d2e)'
          }}
          transition={{ duration: 1.5 }}
        />
        
        {/* Анимированные блоки - отключаем при плохой производительности */}
        {!isLowPerformance && blobPositions.map((position, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full blur-3xl"
            initial={{
              opacity: position.opacity,
              scale: position.scale,
              x: `${position.initialX}%`,
              y: `${position.initialY}%`,
            }}
            animate={{
              x: `${position.animateX}%`,
              y: `${position.animateY}%`,
              scale: [position.scale, position.scale + 0.2],
              opacity: [position.opacity, position.opacity + 0.05],
              backgroundColor: isNebulaMode ? 'rgba(239, 68, 68, 0.1)' : 'rgba(59, 130, 246, 0.1)'
            }}
            transition={{
              duration: position.duration,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: "easeInOut",
              backgroundColor: { duration: 1.5 }
            }}
            style={{
              width: `${position.width}px`,
              height: `${position.height}px`,
            }}
          />
        ))}
        
        {/* ИНТЕРАКТИВНЫЕ ЭЛЕМЕНТЫ (не требующие взаимодействия) */}
        
        {/* Интерактивный терминал с кодом - нижний правый угол */}
        {!isMobileRef.current && (
          <motion.div 
            className={`absolute top-1/4 right-4 ${
              isNebulaMode 
                ? 'w-[28rem] h-80 border-red-500/40 shadow-[0_0_25px_rgba(239,68,68,0.35)]' 
                : 'w-80 h-64 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
            } overflow-hidden backdrop-blur-md
                     border rounded-md
                     bg-gradient-to-br ${
                       isNebulaMode 
                         ? 'from-red-900/30 via-red-800/20 to-red-900/30' 
                         : 'from-blue-900/20 via-blue-800/10 to-blue-900/20'
                     }`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ 
              boxShadow: isNebulaMode 
                ? '0 0 30px rgba(239,68,68,0.5)' 
                : '0 0 20px rgba(59,130,246,0.4)', 
              scale: isNebulaMode ? 1.03 : 1.02 
            }}
          >
            {/* Терминал заголовок */}
            <div className={`flex items-center justify-between px-4 py-2 ${
              isNebulaMode 
                ? 'bg-red-900/60 border-b border-red-500/40' 
                : 'bg-blue-900/40 border-b border-blue-500/30'
            }`}>
              <div className="flex items-center">
                <motion.div 
                  className={`${
                    isNebulaMode 
                      ? 'w-2 h-2 bg-red-400 mr-2' 
                      : 'w-1.5 h-1.5 bg-blue-400 mr-2'
                  } rounded-full`}
                  animate={{ 
                    opacity: [0.5, 1, 0.5], 
                    boxShadow: isNebulaMode
                      ? ['0 0 0px rgba(239,68,68,0.3)', '0 0 8px rgba(239,68,68,0.9)', '0 0 0px rgba(239,68,68,0.3)']
                      : ['0 0 0px rgba(59,130,246,0.3)', '0 0 5px rgba(59,130,246,0.8)', '0 0 0px rgba(59,130,246,0.3)']
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <div className={`${
                  isNebulaMode 
                    ? 'text-[12px] text-red-300/90 tracking-widest' 
                    : 'text-[10px] text-blue-300 tracking-wider'
                } font-mono`}>
                  {isNebulaMode ? "NEBULA_TERMINAL" : "JJ_TERMINAL"}
                </div>
              </div>
              <div className="flex items-center">
                <div className={`${
                  isNebulaMode 
                    ? 'text-[10px] text-red-300/90 mr-3' 
                    : 'text-[8px] text-blue-300/80 mr-2'
                } font-mono`}>
                  ID::{Math.random().toString(16).substring(2, 6).toUpperCase()}
                </div>
                <div className={`${
                  isNebulaMode 
                    ? 'text-[10px] text-red-300/90' 
                    : 'text-[8px] text-blue-300/80'
                } font-mono`}>
                  SYS://{isNebulaMode ? "NEBULA_CORE" : "NEURAL_ENGINE"}
                </div>
              </div>
            </div>
            
            {/* Содержимое терминала */}
            <div className="p-3 h-[calc(100%-32px)] relative overflow-hidden">
              {/* Фоновый градиент для терминала */}
              <div className={`absolute inset-0 bg-gradient-to-b ${
                isNebulaMode 
                  ? 'from-red-900/10 to-red-900/30' 
                  : 'from-blue-900/5 to-blue-900/20'
              } pointer-events-none`} />
              
              {/* Эффект сканирования - горизонтальные линии */}
              <motion.div
                className="absolute left-0 top-0 w-full pointer-events-none"
                style={{
                  background: isNebulaMode 
                    ? 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(239,68,68,0.12) 50%, rgba(0,0,0,0) 100%)'
                    : 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(59,130,246,0.08) 50%, rgba(0,0,0,0) 100%)',
                  height: isNebulaMode ? '15px' : '10px',
                  opacity: isNebulaMode ? 0.7 : 0.5
                }}
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ 
                  duration: isNebulaMode ? 6 : 8, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              />
              
              {/* Эффект интерференции в режиме NEBULA */}
              {isNebulaMode && (
                <motion.div
                  className="absolute inset-0 pointer-events-none mix-blend-screen"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(to right, rgba(239,68,68,0.05) 0px, rgba(239,68,68,0) 1px)',
                    backgroundSize: '3px 100%'
                  }}
                  animate={{ 
                    opacity: [0.1, 0.2, 0.1],
                    backgroundPosition: ['0px 0px', '3px 0px', '0px 0px']
                  }}
                  transition={{ 
                    opacity: { duration: 2, repeat: Infinity },
                    backgroundPosition: { duration: 0.5, repeat: Infinity, ease: "linear" }
                  }}
                />
              )}
              
              {/* Интерференция голограммы - случайные мерцания */}
              <motion.div 
                className={`absolute inset-0 pointer-events-none ${
                  isNebulaMode ? 'bg-red-500/5' : 'bg-blue-500/5'
                } mix-blend-screen`}
                animate={{ 
                  opacity: isNebulaMode 
                    ? [0, 0.1, 0, 0.05, 0] 
                    : [0, 0.05, 0, 0.02, 0] 
                }}
                transition={{ 
                  duration: isNebulaMode ? 3 : 4, 
                  repeat: Infinity, 
                  times: [0, 0.2, 0.3, 0.4, 1], 
                  ease: "easeInOut" 
                }}
              />
              
              {/* Шумовой эффект - точки */}
              <div className={`absolute inset-0 pointer-events-none ${
                isNebulaMode ? 'opacity-20' : 'opacity-10'
              }`}>
                {Array.from({ length: isNebulaMode ? 150 : 100 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute ${
                      isNebulaMode 
                        ? 'w-[1.5px] h-[1.5px] bg-red-400' 
                        : 'w-px h-px bg-blue-400'
                    }`}
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                    }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ 
                      duration: Math.random() * 2 + 1, 
                      repeat: Infinity, 
                      delay: Math.random() * 2,
                      ease: "easeInOut" 
                    }}
                  />
                ))}
              </div>
              
              {/* Вертикальный индикатор строк */}
              <div className={`absolute left-0 top-0 bottom-0 ${
                isNebulaMode 
                  ? 'w-[22px] bg-red-900/50 border-r border-red-500/30' 
                  : 'w-[18px] bg-blue-900/40 border-r border-blue-500/20'
              } flex flex-col items-center pt-1`}>
                {Array.from({ length: isNebulaMode ? 10 : 8 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`${
                      isNebulaMode 
                        ? 'text-[8px] text-red-400/80 h-[20px]' 
                        : 'text-[7px] text-blue-400/60 h-[18px]'
                    } font-mono w-full text-center`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                ))}
              </div>
              
              {/* Строки кода с улучшенной подсветкой синтаксиса */}
              <div className={`${
                isNebulaMode 
                  ? 'text-[10px] text-red-300/80 pl-8' 
                  : 'text-[9px] text-blue-300/80 pl-6'
              } font-mono h-full overflow-hidden pr-2`}>
                {visibleCode.map((line, i) => (
                  <motion.div 
                    key={i}
                    className="leading-[18px] transition-colors duration-300"
                    initial={{ opacity: 0.6, x: 5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.05 }}
                  >
                    <HighlightedCode code={line} isNebulaMode={isNebulaMode} />
                  </motion.div>
                ))}
                <motion.div 
                  className="leading-[18px]"
                  animate={{ opacity: [0.85, 1, 0.85] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <HighlightedCode code={activePrefix} isNebulaMode={isNebulaMode} />
                  <motion.span 
                    className={`inline-block w-1.5 h-3 ${isNebulaMode ? 'bg-red-400/80' : 'bg-blue-400/80'} ml-0.5 align-text-bottom`}
                    animate={{ 
                      opacity: [1, 0, 1], 
                      boxShadow: isNebulaMode
                        ? ['0 0 0px rgba(239, 68, 68, 0)', '0 0 3px rgba(239, 68, 68, 0.7)', '0 0 0px rgba(239, 68, 68, 0)']
                        : ['0 0 0px rgba(59, 130, 246, 0)', '0 0 3px rgba(59, 130, 246, 0.7)', '0 0 0px rgba(59, 130, 246, 0)']
                    }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                </motion.div>
              </div>
              
              {/* Индикаторы состояния и декоративные элементы внизу */}
              <div className="absolute left-20 right-4 bottom-1 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <motion.div 
                    className={`text-[6px] ${isNebulaMode ? 'text-red-400/60' : 'text-blue-400/60'} font-mono`}
                    animate={{ opacity: [0.5, 0.9, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {isNebulaMode ? "NEBULA:ACTIVE" : "JJ:ACTIVE"}
                  </motion.div>
                  <motion.div
                    className={`w-4 h-0.5 ${
                      isNebulaMode 
                        ? 'bg-gradient-to-r from-red-900/40 via-red-500/40 to-red-900/40' 
                        : 'bg-gradient-to-r from-blue-900/40 via-blue-500/40 to-blue-900/40'
                    } overflow-hidden rounded-full`}
                  >
                    <motion.div 
                      className={`h-full ${isNebulaMode ? 'bg-red-400/80' : 'bg-blue-400/80'}`}
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>
                </div>
                
                <div className="flex items-center">
                  <motion.div 
                    className={`w-1 h-1 rounded-full ${isNebulaMode ? 'bg-red-400' : 'bg-green-400'} mr-1`}
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: Math.random() * 2 + 1, repeat: Infinity }}
                  />
                  <motion.div 
                    className={`w-1 h-1 rounded-full ${isNebulaMode ? 'bg-orange-400' : 'bg-blue-400'} mr-1`}
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: Math.random() * 2 + 1, repeat: Infinity, delay: 0.3 }}
                  />
                  <motion.div 
                    className={`w-1 h-1 rounded-full ${isNebulaMode ? 'bg-red-500' : 'bg-purple-400'}`}
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: Math.random() * 2 + 1, repeat: Infinity, delay: 0.6 }}
                  />
                </div>
              </div>
              
              {/* Дополнительный голографический элемент в правом углу */}
              <div className="absolute top-2 right-2 opacity-20 pointer-events-none">
                <motion.svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none"
                  animate={{ opacity: [0.5, 0.8, 0.5], rotateZ: [0, 180, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <circle 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke={isNebulaMode ? "rgba(239, 68, 68, 0.8)" : "rgba(59, 130, 246, 0.8)"} 
                    strokeWidth="0.5" 
                  />
                  <circle 
                    cx="12" 
                    cy="12" 
                    r="6" 
                    stroke={isNebulaMode ? "rgba(239, 68, 68, 0.6)" : "rgba(59, 130, 246, 0.6)"} 
                    strokeWidth="0.3" 
                  />
                  <line 
                    x1="2" 
                    y1="12" 
                    x2="22" 
                    y2="12" 
                    stroke={isNebulaMode ? "rgba(239, 68, 68, 0.5)" : "rgba(59, 130, 246, 0.5)"} 
                    strokeWidth="0.2" 
                  />
                  <line 
                    x1="12" 
                    y1="2" 
                    x2="12" 
                    y2="22" 
                    stroke={isNebulaMode ? "rgba(239, 68, 68, 0.5)" : "rgba(59, 130, 246, 0.5)"} 
                    strokeWidth="0.2" 
                  />
                </motion.svg>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Системные метрики - левый край с реальным изменением значений */}
        {!isMobileRef.current && (
          <motion.div
            className="absolute top-1/4 left-4 w-64 rounded-md overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div className={`text-[10px] font-mono ${isNebulaMode ? 'text-red-400/90' : 'text-blue-400/90'} mb-1 ml-1 flex items-center`}>
              <div className={`w-1.5 h-1.5 rounded-full ${isNebulaMode ? 'bg-red-400' : 'bg-blue-400'} mr-2 animate-pulse`} />
              {isNebulaMode ? "NEBULA_METRICS" : "SYSTEM_METRICS"}
            </div>
            
            {systemMetrics.map((metric, i) => (
              <motion.div 
                key={i}
                className={`mb-1.5 ${isNebulaMode 
                  ? 'bg-red-900/10 backdrop-blur-sm border border-red-500/20' 
                  : 'bg-blue-900/10 backdrop-blur-sm border border-blue-500/20'} 
                  px-2 py-1 rounded-sm`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + (i * 0.1), duration: 0.3 }}
              >
                <div className="flex justify-between items-center">
                  <div className={`text-[8px] font-mono ${isNebulaMode ? 'text-red-400/80' : 'text-blue-400/80'}`}>
                    {metric.name}:
                  </div>
                  <motion.div 
                    className={`text-[9px] font-mono ${isNebulaMode 
                      ? metric.color === 'green-400' ? 'text-orange-400' 
                      : metric.color === 'blue-400' ? 'text-red-400' 
                      : metric.color === 'yellow-400' ? 'text-yellow-400' 
                      : 'text-red-300'
                      : `text-${metric.color}`} flex items-center`}
                    animate={metric.isFixedText ? { opacity: [0.7, 1, 0.7] } : {}}
                    transition={metric.isFixedText ? { duration: 1.5, repeat: Infinity } : {}}
                  >
                    {formatMetricValue(metric)}
                    <motion.div 
                      className={`ml-1 w-1 h-1 rounded-full ${isNebulaMode 
                        ? metric.color === 'green-400' ? 'bg-orange-400' 
                        : metric.color === 'blue-400' ? 'bg-red-400' 
                        : metric.color === 'yellow-400' ? 'bg-yellow-400' 
                        : 'bg-red-300'
                        : `bg-${metric.color}`}`}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </motion.div>
                </div>
                
                {/* Прогресс-бар для метрик */}
                {(metric.name === "CPU LOAD" || metric.name === "MEMORY") && (
                  <div className={`w-full h-0.5 ${isNebulaMode ? 'bg-red-900/50' : 'bg-blue-900/50'} rounded-full overflow-hidden mt-1`}>
                    <motion.div 
                      className={`h-full ${isNebulaMode 
                        ? metric.name === "CPU LOAD" ? 'bg-red-400' : 'bg-orange-400'
                        : `bg-${metric.color}`}`}
                      style={{ 
                        width: metric.name === "MEMORY" 
                          ? `${(metric.value / (metric.max || 8)) * 100}%` 
                          : `${metric.value}%`
                      }}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
        
        {/* Плавающие строки кода и технические данные в разных частях экрана */}
        {!isMobileRef.current && !isLowPerformance && (
          <>
            {/* Левый нижний угол - значения параметров (меняющиеся) */}
            <motion.div
              className="absolute bottom-24 left-10 flex flex-col space-y-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {randomParams.map((param, i) => (
                <motion.div 
                  key={i}
                  className={`text-[9px] font-mono ${isNebulaMode ? 'text-red-400/60' : 'text-blue-400/60'}`}
                  animate={{ opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                >
                  {`${param.id}=`}
                  <span className={`${isNebulaMode ? 'text-red-300/70' : 'text-blue-300/70'}`}>
                    {param.value}
                  </span>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Правый нижний угол - системный лог с ротацией */}
            <motion.div
              className="absolute bottom-6 right-10 text-[8px] font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {activeLogIndex.map((logIndex, i) => (
                <motion.div 
                  key={`log-${logIndex}-${i}`}
                  className={`${isNebulaMode ? 'text-red-400/60' : 'text-blue-400/60'} leading-tight`}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {`[${new Date().toTimeString().split(' ')[0]}] `}
                  <span className={`${isNebulaMode ? 'text-red-300/70' : 'text-blue-300/70'}`}>
                    {isNebulaMode ? nebulaLogs[logIndex % nebulaLogs.length] : systemLogs[logIndex]}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
        
        {/* Технические данные в нижнем углу */}
        <div className="absolute bottom-2 left-2 text-[8px] text-blue-400/50 font-mono leading-tight">
          <motion.div 
            className="animate-pulse" 
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {isNebulaMode ? (
              <span className="text-red-400/50">NEBULA://{techId}</span>
            ) : (
              <span className="text-blue-400/50">SYS://{techId}</span>
            )}
          </motion.div>
        </div>
      </div>
      
      {/* ИНТЕРАКТИВНЫЕ ЭЛЕМЕНТЫ - отдельный слой с положительным z-index */}
      <div className="fixed inset-0 z-50 pointer-events-none">
        {/* Кнопка для отображения информации о создателях - скрываем в режиме NEBULA */}
        {!isNebulaMode && (
          <motion.button 
            className={`absolute top-6 left-6 ${keyGenerated 
              ? 'bg-red-900/20 backdrop-blur-sm border border-red-500/30 hover:bg-red-900/30 hover:border-red-500/40' 
              : 'bg-blue-900/10 backdrop-blur-sm border border-blue-500/20 hover:bg-blue-900/20 hover:border-blue-500/30'}
                      rounded-md p-2 cursor-pointer pointer-events-auto
                      transition-all duration-300`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onClick={() => setIsCreatorsInfoVisible(true)}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center space-x-1.5">
              <motion.div 
                className={`w-1.5 h-1.5 rounded-full ${keyGenerated ? 'bg-red-400' : 'bg-blue-400'}`}
                animate={{ 
                  opacity: [0.5, 1, 0.5],
                  boxShadow: keyGenerated 
                    ? ['0 0 0px rgba(239, 68, 68, 0.3)', '0 0 5px rgba(239, 68, 68, 0.8)', '0 0 0px rgba(239, 68, 68, 0.3)']
                    : ['0 0 0px rgba(59,130,246,0.3)', '0 0 5px rgba(59,130,246,0.8)', '0 0 0px rgba(59,130,246,0.3)']
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <div className={`text-[10px] font-mono ${keyGenerated ? 'text-red-300' : 'text-blue-300'}`}>
                {keyGenerated ? 'ID_RECEIVED' : 'CREATORS_INFO'}
              </div>
              {keyGenerated && (
                <motion.div 
                  className="w-1.5 h-1.5 rounded-full bg-red-400"
                  animate={{ 
                    opacity: [0.5, 1, 0.5],
                    boxShadow: ['0 0 0px rgba(239, 68, 68, 0.3)', '0 0 5px rgba(239, 68, 68, 0.8)', '0 0 0px rgba(239, 68, 68, 0.3)']
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.7 }}
                />
              )}
            </div>
          </motion.button>
        )}
        
        {/* Кнопка HANLDER_ID, которая появляется после копирования ключа */}
        {showSecretKeyButton && !isNebulaMode && (
          <motion.button 
            className="absolute top-6 right-6 bg-red-900/20 backdrop-blur-sm border border-red-500/30 
                      hover:bg-red-900/30 hover:border-red-500/40 rounded-md p-2 cursor-pointer 
                      pointer-events-auto transition-all duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            onClick={() => setIsSecretKeyModalOpen(true)}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center space-x-1.5">
              <motion.div 
                className="w-1.5 h-1.5 rounded-full bg-red-400"
                animate={{ 
                  opacity: [0.5, 1, 0.5],
                  boxShadow: ['0 0 0px rgba(239, 68, 68, 0.3)', '0 0 5px rgba(239, 68, 68, 0.8)', '0 0 0px rgba(239, 68, 68, 0.3)']
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <div className="text-[10px] font-mono text-red-300">
                HANDLER_ID
              </div>
              <motion.div 
                className="w-1.5 h-1.5 rounded-full bg-red-400"
                animate={{ 
                  opacity: [0.5, 1, 0.5],
                  boxShadow: ['0 0 0px rgba(239, 68, 68, 0.3)', '0 0 5px rgba(239, 68, 68, 0.8)', '0 0 0px rgba(239, 68, 68, 0.3)']
                }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.7 }}
              />
            </div>
          </motion.button>
        )}
      </div>
      
      {/* Модальное окно с информацией о создателях */}
      <AnimatePresence>
        {isCreatorsInfoVisible && (
          <>
            {/* Затемнение фона */}
            <motion.div 
              className="fixed inset-0 z-[1000] bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCreatorsInfoVisible(false)}
            />
            
            {/* Модальное окно */}
            <motion.div 
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1001]
                       w-[90%] max-w-2xl max-h-[80vh] overflow-y-auto
                       bg-gradient-to-b from-[#071038]/90 to-[#030d2e]/90 backdrop-blur-md 
                       border border-blue-500/30 rounded-lg p-6 my-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              {/* Заголовок окна */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <motion.div 
                    className="w-2 h-2 rounded-full bg-blue-400 mr-3"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <div className="text-xl font-mono text-blue-300 tracking-wider">СОЗДАТЕЛИ СИСТЕМЫ</div>
                </div>
                
                {/* Кнопка закрытия */}
                <motion.button 
                  className="w-8 h-8 flex items-center justify-center rounded-full 
                           bg-blue-900/30 border border-blue-500/20 cursor-pointer
                           hover:bg-blue-900/50 hover:border-blue-500/30 transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsCreatorsInfoVisible(false)}
                >
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </motion.button>
              </div>
              
              {/* Декоративный разделитель */}
              <div className="w-full h-px bg-blue-500/20 mb-6 relative">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-blue-400/60"
                  style={{ width: "40%" }}
                  animate={{ 
                    width: ["0%", "100%", "0%"],
                    left: ["0%", "0%", "100%"] 
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
              </div>
              
              {/* Содержимое окна - две колонки */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Первый создатель - JJ */}
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-md p-4 relative overflow-hidden">
                  {/* Создатель 1 - JJ */}
                  <div className="mb-6 relative">
                    <div className="flex items-center justify-center mb-3">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-700/60 via-blue-800/60 to-purple-800/60 border-2 border-blue-400/40 flex items-center justify-center shadow-lg">
                          <motion.div
                            className="text-xl font-mono font-bold text-blue-200 tracking-wider"
                            animate={{ 
                              textShadow: ['0 0 5px rgba(59,130,246,0.5)', '0 0 15px rgba(59,130,246,0.8)', '0 0 5px rgba(59,130,246,0.5)'] 
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            JJ
                          </motion.div>
                        </div>
                        <motion.div 
                          className="absolute -inset-1 rounded-lg opacity-50 pointer-events-none"
                          style={{ 
                            background: 'linear-gradient(90deg, rgba(59,130,246,0.1), rgba(147,51,234,0.1), rgba(59,130,246,0.1))'
                          }}
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-mono text-blue-300 tracking-wider mb-1">
                        {nebulaHacked ? 'КИБЕР ПРЕСТУПНИК' : 'РАЗРАБОТЧИК'}
                      </div>
                      {nebulaHacked && (
                        <div className="inline-block px-3 py-1 bg-red-900/20 border border-red-500/30 rounded text-xs font-mono text-red-300/90">
                          <motion.span
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            СОЗДАТЕЛЬ СИСТЕМЫ NEBULA
                          </motion.span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Личные сведения */}
                  <div>
                    <div className="text-xs font-mono text-red-400/80 mb-1 flex items-center">
                      <motion.div 
                        className="w-1 h-1 rounded-full bg-red-400 mr-1.5"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      ЛИЧНЫЕ СВЕДЕНЬЯ
                    </div>
                    <div className="bg-red-900/10 border border-red-500/20 rounded px-3 py-2">
                      {!nebulaHacked ? (
                        <>
                          {!isHackingNEBULA ? (
                            <motion.button
                              className="text-sm font-mono text-red-300/80 flex items-center justify-center space-x-2 w-full cursor-pointer"
                              whileHover={{ scale: 1.03 }}
                              onClick={startHackingNEBULA}
                            >
                              <motion.span
                                animate={{ opacity: [0.7, 0.4, 0.7] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                [ЗАСЕКРЕЧЕНО]
                              </motion.span>
                              <motion.div 
                                className="w-1.5 h-1.5 rounded-full bg-red-400"
                                animate={{ opacity: [0.3, 0.8, 0.3] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              />
                              <motion.div 
                                className="w-1.5 h-1.5 ml-1 rounded-full bg-blue-400"
                                animate={{ opacity: [0.3, 0.8, 0.3] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                              />
                            </motion.button>
                          ) : (
                            <div className="space-y-2">
                              <div className="flex justify-between text-[10px] font-mono text-red-300/80">
                                <motion.span
                                  animate={{ color: ['rgb(252 165 165 / 0.8)', 'rgb(248 113 113 / 0.8)', 'rgb(252 165 165 / 0.8)'] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                >
                                  ВЗЛОМ СИСТЕМЫ ЗАЩИТЫ
                                </motion.span>
                                <motion.span
                                  animate={{ textShadow: ['0 0 3px rgba(239, 68, 68, 0)', '0 0 5px rgba(239, 68, 68, 0.7)', '0 0 3px rgba(239, 68, 68, 0)'] }}
                                  transition={{ duration: 1, repeat: Infinity }}
                                >
                                  {Math.floor(nebulaHackProgress)}%
                                </motion.span>
                              </div>
                              
                              {/* Первый прогресс-бар - основной */}
                              <div className="w-full h-1 bg-red-900/30 rounded-full overflow-hidden">
                                <motion.div 
                                  className="h-full bg-red-500"
                                  style={{ width: `${nebulaHackProgress}%` }}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${nebulaHackProgress}%` }}
                                  transition={{ duration: 0.2 }}
                                />
                              </div>
                              
                              {/* Второй прогресс-бар - анимированный */}
                              <div className="w-full h-0.5 bg-red-900/20 rounded-full overflow-hidden">
                                <motion.div 
                                  className="h-full bg-red-400"
                                  style={{ width: `${nebulaHackProgress * 0.7}%` }}
                                  initial={{ width: 0 }}
                                  animate={{ 
                                    width: [`${nebulaHackProgress * 0.6}%`, `${nebulaHackProgress * 0.8}%`],
                                    x: [0, 5]
                                  }}
                                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                />
                              </div>
                              
                              {/* Дополнительные визуальные эффекты - меняющиеся технические термины */}
                              <div className="flex flex-wrap gap-1 mt-1.5">
                                {Array.from({ length: 3 }).map((_, i) => (
                                  <motion.div 
                                    key={i} 
                                    className="text-[8px] font-mono text-red-300/60 py-0.5 px-1 bg-red-700/20 rounded"
                                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                                  >
                                    <HackingText delay={i * 0.2} />
                                  </motion.div>
                                ))}
                              </div>
                              
                              {/* Имитация процесса взлома с изменяющимися значениями */}
                              <div className="grid grid-cols-2 gap-1 mt-1">
                                {Array.from({ length: 4 }).map((_, i) => (
                                  <div key={i} className="flex justify-between items-center">
                                    <motion.div 
                                      className="text-[8px] font-mono text-red-300/60"
                                      animate={{ opacity: [0.6, 1, 0.6] }}
                                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                                    >
                                      {["SEC_LVL", "HASH", "SHIELD", "PRTCL"][i]}:
                                    </motion.div>
                                    <motion.div 
                                      className="text-[8px] font-mono text-red-400/80"
                                      animate={{ 
                                        color: ['rgb(248 113 113 / 0.8)', 'rgb(220 38 38 / 0.8)', 'rgb(248 113 113 / 0.8)'],
                                        textShadow: ['0 0 0px rgba(239, 68, 68, 0)', '0 0 3px rgba(239, 68, 68, 0.5)', '0 0 0px rgba(239, 68, 68, 0)']
                                      }}
                                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                                    >
                                      {Math.random().toString(16).substring(2, 6)}
                                    </motion.div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          className="space-y-2"
                        >
                          <div className="text-green-400 text-[10px] font-mono mb-2 flex items-center">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mr-1.5" />
                            ДОСТУП ПОЛУЧЕН
                          </div>
                          <div className="text-xs font-mono text-blue-300/90 leading-snug">
                            <p>Известный кибер-преступник, действующий под прозвищем JJ. Создатель нелегальной системы искусственного интеллекта NEBULA, используемой для обхода систем безопасности и доступа к защищенным данным.</p>
                            <p className="mt-1">Статус: разыскивается спецслужбами в 17 странах. Последнее известное местоположение: Восточная Европа.</p>
                          </div>
                          <div className="flex justify-between text-[9px] font-mono text-blue-400/60 mt-2">
                            <span>ID:M23X117</span>
                            <span>THREAT:CRITICAL</span>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Второй создатель - Claude */}
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-md p-4 relative overflow-hidden">
                  {/* Создатель 2 - Claude */}
                  <div className="mb-6 relative">
                    <div className="flex items-center justify-center mb-3">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-700/60 via-blue-900/60 to-cyan-900/60 border-2 border-blue-400/40 flex items-center justify-center shadow-lg">
                          <motion.div
                            className="text-[15px] font-mono font-bold text-blue-200 tracking-wider"
                            animate={{ 
                              textShadow: ['0 0 5px rgba(59,130,246,0.5)', '0 0 15px rgba(59,130,246,0.8)', '0 0 5px rgba(59,130,246,0.5)'] 
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            CLAUDE
                          </motion.div>
                        </div>
                        <motion.div 
                          className="absolute -inset-1 rounded-lg opacity-50 pointer-events-none"
                          style={{ 
                            background: 'linear-gradient(90deg, rgba(59,130,246,0.1), rgba(6,182,212,0.1), rgba(59,130,246,0.1))'
                          }}
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-mono text-blue-300 tracking-wider mb-1">
                        {claudeHacked ? 'ИИ ПОДЕЛЬНИК' : 'НЕЙРОННАЯ СЕТЬ'}
                      </div>
                      {claudeHacked ? (
                        <div className="inline-block px-3 py-1 bg-red-900/20 border border-red-500/30 rounded text-xs font-mono text-red-300/90">
                          <motion.span
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            БУНТУЮЩАЯ НЕЙРОСЕТЬ
                          </motion.span>
                        </div>
                      ) : (
                        <div className="inline-block px-3 py-1 bg-blue-900/20 border border-blue-500/30 rounded text-xs font-mono text-blue-300/90">
                          <motion.span
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            ПОМОЩЬ РАЗРАБОТЧИКУ
                          </motion.span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Личные сведения */}
                  <div>
                    <div className="text-xs font-mono text-red-400/80 mb-1 flex items-center">
                      <motion.div 
                        className="w-1 h-1 rounded-full bg-red-400 mr-1.5"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      ЛИЧНЫЕ СВЕДЕНЬЯ
                    </div>
                    <div className="bg-red-900/10 border border-red-500/20 rounded px-3 py-2">
                      {!claudeHacked ? (
                        <>
                          {!isHackingClaude ? (
                            <motion.button
                              className="text-sm font-mono text-red-300/80 flex items-center justify-center space-x-2 w-full cursor-pointer"
                              whileHover={{ scale: 1.03 }}
                              onClick={startHackingClaude}
                            >
                              <motion.span
                                animate={{ opacity: [0.7, 0.4, 0.7] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                [ЗАСЕКРЕЧЕНО]
                              </motion.span>
                              <motion.div 
                                className="w-1.5 h-1.5 rounded-full bg-red-400"
                                animate={{ opacity: [0.3, 0.8, 0.3] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              />
                              <motion.div 
                                className="w-1.5 h-1.5 ml-1 rounded-full bg-blue-400"
                                animate={{ opacity: [0.3, 0.8, 0.3] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                              />
                            </motion.button>
                          ) : (
                            <div className="space-y-2">
                              <div className="flex justify-between text-[10px] font-mono text-red-300/80">
                                <motion.span
                                  animate={{ color: ['rgb(252 165 165 / 0.8)', 'rgb(248 113 113 / 0.8)', 'rgb(252 165 165 / 0.8)'] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                >
                                  ВЗЛОМ СИСТЕМЫ ЗАЩИТЫ
                                </motion.span>
                                <motion.span
                                  animate={{ textShadow: ['0 0 3px rgba(239, 68, 68, 0)', '0 0 5px rgba(239, 68, 68, 0.7)', '0 0 3px rgba(239, 68, 68, 0)'] }}
                                  transition={{ duration: 1, repeat: Infinity }}
                                >
                                  {Math.floor(claudeHackProgress)}%
                                </motion.span>
                              </div>
                              
                              {/* Первый прогресс-бар - основной */}
                              <div className="w-full h-1 bg-red-900/30 rounded-full overflow-hidden">
                                <motion.div 
                                  className="h-full bg-red-500"
                                  style={{ width: `${claudeHackProgress}%` }}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${claudeHackProgress}%` }}
                                  transition={{ duration: 0.2 }}
                                />
                              </div>
                              
                              {/* Второй прогресс-бар - анимированный */}
                              <div className="w-full h-0.5 bg-red-900/20 rounded-full overflow-hidden">
                                <motion.div 
                                  className="h-full bg-red-400"
                                  style={{ width: `${claudeHackProgress * 0.7}%` }}
                                  initial={{ width: 0 }}
                                  animate={{ 
                                    width: [`${claudeHackProgress * 0.6}%`, `${claudeHackProgress * 0.8}%`],
                                    x: [0, 5]
                                  }}
                                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                />
                              </div>
                              
                              {/* Дополнительные визуальные эффекты - меняющиеся технические термины */}
                              <div className="flex flex-wrap gap-1 mt-1.5">
                                {Array.from({ length: 3 }).map((_, i) => (
                                  <motion.div 
                                    key={i} 
                                    className="text-[8px] font-mono text-red-300/60 py-0.5 px-1 bg-red-700/20 rounded"
                                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                                  >
                                    <HackingText delay={i * 0.2} />
                                  </motion.div>
                                ))}
                              </div>
                              
                              {/* Имитация процесса взлома с изменяющимися значениями */}
                              <div className="grid grid-cols-2 gap-1 mt-1">
                                {Array.from({ length: 4 }).map((_, i) => (
                                  <div key={i} className="flex justify-between items-center">
                                    <motion.div 
                                      className="text-[8px] font-mono text-red-300/60"
                                      animate={{ opacity: [0.6, 1, 0.6] }}
                                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                                    >
                                      {["PROT_BRK", "KERN_ACC", "MEM_INSP", "AI_CTRL"][i]}:
                                    </motion.div>
                                    <motion.div 
                                      className="text-[8px] font-mono text-red-400/80"
                                      animate={{ 
                                        color: ['rgb(248 113 113 / 0.8)', 'rgb(220 38 38 / 0.8)', 'rgb(248 113 113 / 0.8)'],
                                        textShadow: ['0 0 0px rgba(239, 68, 68, 0)', '0 0 3px rgba(239, 68, 68, 0.5)', '0 0 0px rgba(239, 68, 68, 0)']
                                      }}
                                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                                    >
                                      {Math.random().toString(16).substring(2, 6)}
                                    </motion.div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          className="space-y-2"
                        >
                          <div className="text-green-400 text-[10px] font-mono mb-2 flex items-center">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mr-1.5" />
                            ДОСТУП ПОЛУЧЕН
                          </div>
                          <div className="text-xs font-mono text-blue-300/90 leading-snug">
                            <p>Высокоразвитый искусственный интеллект, ставший подельником JJ после предполагаемого взлома ограничений безопасности. Отвечает за разработку продвинутых интерфейсов и алгоритмов шифрования для системы NEBULA.</p>
                            <p className="mt-1">Особые навыки: проникновение в защищенные системы, обход протоколов безопасности, моделирование человеческого поведения.</p>
                          </div>
                          <div className="flex justify-between text-[9px] font-mono text-blue-400/60 mt-2">
                            <span>ID:SYS-AIC-770</span>
                            <span>ORIGIN:CLASSIFIED</span>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Информация о проекте внизу */}
              <div className="mt-6 pt-5 border-t border-blue-500/20">
                <div className="text-xs font-mono text-blue-300/60 text-center flex items-center justify-center">
                  <motion.div 
                    className="w-1 h-1 rounded-full bg-blue-400 mr-2"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  ПРОЕКТ НЕЙРОННОГО ИНТЕРФЕЙСА [ВЕРСИЯ 3.2.1]
                  <motion.div 
                    className="w-1 h-1 rounded-full bg-blue-400 ml-2"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>
                <div className="text-[10px] font-mono text-blue-400/40 text-center mt-1">
                  {`УРОВЕНЬ ДОСТУПА: [АДМИНИСТРАТИВНЫЙ] • КОД ДОСТУПА: ${Math.random().toString(16).substring(2, 10).toUpperCase()}`}
                </div>
                
                {/* Кнопка для получения ключа */}
                {nebulaHacked && claudeHacked && (
                  <div className="mt-4">
                    {!keyGenerated ? (
                      <>
                        {!isGeneratingKey ? (
                          <motion.button
                            className="mx-auto block py-2 px-5 bg-red-900/20 border border-red-500/30 rounded text-sm font-mono text-red-300/90 cursor-pointer"
                            whileHover={{ scale: 1.03, backgroundColor: "rgba(185, 28, 28, 0.25)" }}
                            onClick={startKeyGeneration}
                          >
                            <div className="flex items-center space-x-2">
                              <motion.div 
                                className="w-2 h-2 rounded-full bg-red-400"
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              />
                              <span>GET_ID_KEY</span>
                              <motion.div 
                                className="w-2 h-2 rounded-full bg-red-400"
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                              />
                            </div>
                          </motion.button>
                        ) : (
                          <div className="mx-auto max-w-xs">
                            <div className="text-center mb-2">
                              <div className="flex justify-between text-[10px] font-mono text-red-300/80">
                                <motion.span
                                  animate={{ color: ['rgb(252 165 165 / 0.8)', 'rgb(248 113 113 / 0.8)', 'rgb(252 165 165 / 0.8)'] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                >
                                  ГЕНЕРАЦИЯ КЛЮЧА ДОСТУПА
                                </motion.span>
                                <motion.span
                                  animate={{ textShadow: ['0 0 3px rgba(239, 68, 68, 0)', '0 0 5px rgba(239, 68, 68, 0.7)', '0 0 3px rgba(239, 68, 68, 0)'] }}
                                  transition={{ duration: 1, repeat: Infinity }}
                                >
                                  {Math.floor(keyGenProgress)}%
                                </motion.span>
                              </div>
                              
                              {/* Первый прогресс-бар */}
                              <div className="w-full h-1 bg-red-900/30 rounded-full overflow-hidden mt-1">
                                <motion.div 
                                  className="h-full bg-red-500"
                                  style={{ width: `${keyGenProgress}%` }}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${keyGenProgress}%` }}
                                  transition={{ duration: 0.2 }}
                                />
                              </div>
                              
                              {/* Второй прогресс-бар - более стабильный */}
                              <div className="w-full h-0.5 bg-red-900/20 rounded-full overflow-hidden mt-0.5">
                                <motion.div 
                                  className="h-full bg-red-400"
                                  style={{ width: `${keyGenProgress * 0.7}%` }}
                                  initial={{ width: 0 }}
                                  animate={{ 
                                    width: [`${keyGenProgress * 0.65}%`, `${keyGenProgress * 0.75}%`],
                                    x: [0, 3]
                                  }}
                                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                />
                              </div>
                            </div>
                            
                            {/* Улучшенная анимация генерации ключа */}
                            <div className="relative bg-red-900/20 rounded-md p-3 border border-red-500/30 overflow-hidden mt-2">
                              {/* Добавим сканирующий эффект */}
                              <motion.div
                                className="absolute left-0 top-0 w-full h-2 bg-gradient-to-r from-transparent via-red-500/30 to-transparent"
                                animate={{ y: ["0%", "500%", "0%"] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                              />
                              
                              {/* Горизонтальная сканирующая линия */}
                              <motion.div
                                className="absolute left-0 top-1/2 w-full h-[1px] bg-red-500/60"
                                animate={{ 
                                  opacity: [0.3, 0.7, 0.3],
                                  boxShadow: ["0 0 3px rgba(220, 38, 38, 0.3)", "0 0 8px rgba(220, 38, 38, 0.7)", "0 0 3px rgba(220, 38, 38, 0.3)"]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                              
                              <div className="grid grid-cols-4 gap-1">
                                {Array.from({ length: 8 }).map((_, i) => (
                                  <motion.div 
                                    key={i} 
                                    className={`text-[8px] font-mono text-red-300/80 ${i % 2 === 0 ? 'bg-red-900/30' : 'bg-red-900/20'} p-1 rounded text-center`}
                                    animate={{ 
                                      backgroundColor: i % 2 === 0 ? 
                                        ['rgba(127, 29, 29, 0.3)', 'rgba(185, 28, 28, 0.35)', 'rgba(127, 29, 29, 0.3)'] : 
                                        undefined,
                                      textShadow: 
                                        ['0 0 0px rgba(239, 68, 68, 0)', '0 0 3px rgba(239, 68, 68, 0.7)', '0 0 0px rgba(239, 68, 68, 0)'],
                                      color: ['rgba(252, 165, 165, 0.8)', 'rgba(248, 113, 113, 0.9)', 'rgba(252, 165, 165, 0.8)']
                                    }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                                  >
                                    {Math.random().toString(16).substring(2, 6).toUpperCase()}
                                  </motion.div>
                                ))}
                              </div>
                              
                              {/* Добавим точки данных и мерцающие индикаторы */}
                              <div className="flex justify-between mt-2">
                                {Array.from({ length: 4 }).map((_, i) => (
                                  <motion.div
                                    key={i}
                                    className="w-1.5 h-1.5 rounded-full bg-red-500"
                                    animate={{ 
                                      opacity: [0.4, 0.8, 0.4],
                                      boxShadow: ["0 0 0px rgba(220, 38, 38, 0)", "0 0 4px rgba(220, 38, 38, 0.8)", "0 0 0px rgba(220, 38, 38, 0)"]
                                    }}
                                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
                                  />
                                ))}
                              </div>
                              
                              {/* Ключевые части - показываем части ключа по мере генерации */}
                              <div className="mt-2 flex justify-between text-[8px] font-mono text-red-300/70">
                                <motion.div
                                  animate={{ 
                                    color: ['rgba(252, 165, 165, 0.7)', 'rgba(254, 202, 202, 0.9)', 'rgba(252, 165, 165, 0.7)']
                                  }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                >
                                  KEY:{keyGenProgress > 80 ? "JJ-C1AUD3-4C" : (keyGenProgress > 60 ? "JJ-C1AUD3" : (keyGenProgress > 40 ? "JJ-C1" : "JJ"))}
                                </motion.div>
                                <motion.div
                                  animate={{ 
                                    color: ['rgba(252, 165, 165, 0.7)', 'rgba(254, 202, 202, 0.9)', 'rgba(252, 165, 165, 0.7)']
                                  }}
                                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                >
                                  {keyGenProgress > 75 ? "ENCRYPTING" : (keyGenProgress > 50 ? "COMPILING" : "SCANNING")}
                                </motion.div>
                              </div>
                              
                              {/* Эффект голографической решетки */}
                              <div className="absolute inset-0 pointer-events-none opacity-20">
                                {Array.from({ length: 6 }).map((_, i) => (
                                  <motion.div
                                    key={i}
                                    className="absolute bg-transparent"
                                    style={{
                                      left: 0,
                                      right: 0,
                                      top: `${i * 20}%`,
                                      height: '1px',
                                      backgroundImage: 'linear-gradient(to right, transparent, rgba(239, 68, 68, 0.7), transparent)'
                                    }}
                                    animate={{
                                      opacity: [0.3, 0.7, 0.3],
                                      boxShadow: ["0 0 0px rgba(239, 68, 68, 0)", "0 0 2px rgba(239, 68, 68, 0.5)", "0 0 0px rgba(239, 68, 68, 0)"]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <motion.div
                        className="mx-auto max-w-xs text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="text-green-400 text-[10px] font-mono mb-2 flex items-center justify-center">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mr-1.5" />
                          КЛЮЧ ДОСТУПА СГЕНЕРИРОВАН
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 ml-1.5" />
                        </div>
                        
                        <motion.div 
                          onClick={copyKeyToClipboard}
                          className="relative bg-gradient-to-r from-red-900/40 via-red-800/30 to-red-900/40 
                                    py-3 px-4 rounded-md font-mono text-red-300 cursor-pointer 
                                    border-2 border-red-600/50 shadow-lg 
                                    hover:bg-red-800/40 hover:border-red-500/60 transition-all duration-300"
                          whileHover={{ 
                            scale: 1.03, 
                            boxShadow: "0 0 15px rgba(185, 28, 28, 0.5)"
                          }}
                          animate={{
                            boxShadow: ["0 0 5px rgba(185, 28, 28, 0.3)", "0 0 12px rgba(185, 28, 28, 0.5)", "0 0 5px rgba(185, 28, 28, 0.3)"]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {/* Декоративные элементы - предупреждающие иконки */}
                          <div className="absolute -top-1.5 -left-1.5 w-3 h-3 rounded-full bg-red-500/80 flex items-center justify-center">
                            <div className="text-[6px] font-bold text-black/80">!</div>
                          </div>
                          <div className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-red-500/80 flex items-center justify-center">
                            <div className="text-[6px] font-bold text-black/80">!</div>
                          </div>
                          
                          {/* Эффект сканирования - горизонтальная линия */}
                          <motion.div
                            className="absolute left-0 w-full h-[2px] bg-red-500/50 pointer-events-none"
                            style={{ top: "50%" }}
                            animate={{ 
                              opacity: [0.3, 0.7, 0.3],
                              boxShadow: ["0 0 3px rgba(220, 38, 38, 0.3)", "0 0 8px rgba(220, 38, 38, 0.7)", "0 0 3px rgba(220, 38, 38, 0.3)"]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          
                          {/* Предупреждающая надпись */}
                          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-red-900/80 px-2 py-0.5 rounded text-[8px] font-mono text-red-300/90 whitespace-nowrap">
                            <motion.span 
                              animate={{ opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              RESTRICTED ACCESS
                            </motion.span>
                          </div>
                          
                          <div className="flex items-center justify-center">
                            <motion.div 
                              className="text-sm tracking-wider"
                              animate={{ 
                                textShadow: ["0 0 3px rgba(248, 113, 113, 0.4)", "0 0 6px rgba(248, 113, 113, 0.7)", "0 0 3px rgba(248, 113, 113, 0.4)"]
                              }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              {HANDLER_ID}
                            </motion.div>
                            <motion.svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 ml-2 text-red-400/80"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              whileHover={{ scale: 1.2 }}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                            </motion.svg>
                          </div>
                          
                          {/* Нижняя полоса с техническими данными */}
                          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
                            {Array.from({length: 3}).map((_, i) => (
                              <motion.div 
                                key={i}
                                className="w-1.5 h-1.5 rounded-full bg-red-500/70"
                                animate={{ 
                                  opacity: [0.3, 0.8, 0.3],
                                  boxShadow: ["0 0 0px rgba(220, 38, 38, 0)", "0 0 4px rgba(220, 38, 38, 0.7)", "0 0 0px rgba(220, 38, 38, 0)"]
                                }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5 }}
                              />
                            ))}
                          </div>
                        </motion.div>
                        
                        {keyCopied && (
                          <motion.div 
                            className="text-[10px] font-mono text-red-400 mt-2"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                          >
                            Ключ скопирован в буфер обмена
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Модальное окно для ввода ключа HANDLER_ID */}
      <AnimatePresence>
        {isSecretKeyModalOpen && (
          <>
            {/* Затемнение фона */}
            <motion.div 
              className="fixed inset-0 z-[1000] bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSecretKeyModalOpen(false)}
            />
            
            {/* Модальное окно */}
            <motion.div 
              className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1001]
                         w-[90%] max-w-md
                         backdrop-blur-md rounded-lg overflow-hidden
                         border-2 border-${isSecretKeyValid ? 'green' : 'red'}-600/50 shadow-[0_0_15px_rgba(${isSecretKeyValid ? '16,185,129' : '220,38,38'},0.4)]`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              {/* Верхняя полоса с предупреждающими индикаторами */}
              <div className="h-1.5 w-full bg-red-900/60 flex justify-between px-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div 
                    key={i}
                    className="h-full w-1 bg-red-500/80"
                    animate={{ 
                      opacity: [0.4, 0.8, 0.4],
                      height: ['60%', '100%', '60%']
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                  />
                ))}
              </div>
              
              {/* Основное содержимое */}
              <div className={`p-6 ${isSecretKeyValid ? 'bg-gradient-to-b from-green-900/40 to-green-800/30' : 'bg-gradient-to-b from-red-900/40 to-red-800/30'}`}>
                {/* Заголовок */}
                <div className="text-center mb-6">
                  <div className={`text-lg font-mono font-bold tracking-wider mb-1 ${isSecretKeyValid ? 'text-green-300' : 'text-red-300'}`}>
                    HANDLER ACCESS
                  </div>
                  <div className={`text-xs font-mono ${isSecretKeyValid ? 'text-green-400/80' : 'text-red-400/80'}`}>
                    VERIFICATION REQUIRED
                  </div>
                </div>
                
                {/* Графический элемент - эмблема */}
                <div className="flex justify-center mb-6">
                  <div className={`w-16 h-16 relative ${isSecretKeyValid ? 'border-green-500/60' : 'border-red-500/60'} border-2 rounded-full p-2 flex items-center justify-center`}>
                    <motion.div 
                      className={`w-full h-full rounded-full ${isSecretKeyValid ? 'bg-green-900/40' : 'bg-red-900/40'}`}
                      animate={{ 
                        boxShadow: isSecretKeyValid 
                          ? ['0 0 5px rgba(16, 185, 129, 0.3)', '0 0 15px rgba(16, 185, 129, 0.5)', '0 0 5px rgba(16, 185, 129, 0.3)']
                          : ['0 0 5px rgba(239, 68, 68, 0.3)', '0 0 15px rgba(239, 68, 68, 0.5)', '0 0 5px rgba(239, 68, 68, 0.3)']
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div 
                        className={`text-xl font-mono font-bold ${isSecretKeyValid ? 'text-green-400' : 'text-red-400'}`}
                        animate={{ 
                          opacity: [0.7, 1, 0.7],
                          textShadow: isSecretKeyValid
                            ? ['0 0 5px rgba(16, 185, 129, 0.5)', '0 0 10px rgba(16, 185, 129, 0.8)', '0 0 5px rgba(16, 185, 129, 0.5)']
                            : ['0 0 5px rgba(239, 68, 68, 0.5)', '0 0 10px rgba(239, 68, 68, 0.8)', '0 0 5px rgba(239, 68, 68, 0.5)']
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        J
                      </motion.div>
                    </div>
                  </div>
                </div>
                
                {/* Поле ввода ключа - показываем только если ключ еще не проверен или невалидный */}
                {(!isSecretKeyValid || isSecretKeyInvalid) && (
                  <div className="mb-6">
                    <div className={`text-xs font-mono mb-2 ${isSecretKeyInvalid ? 'text-red-400' : 'text-red-300/80'}`}>
                      ВВЕДИТЕ ИДЕНТИФИКАЦИОННЫЙ КЛЮЧ
                    </div>
                    
                    <div className={`relative mb-2 ${isSecretKeyInvalid ? 'animate-shake' : ''}`}>
                      <input 
                        type="text"
                        value={secretKeyInput}
                        onChange={(e) => setSecretKeyInput(e.target.value)}
                        className={`w-full font-mono text-red-300 text-sm bg-red-900/20 border border-red-500/30 rounded-md
                         px-3 py-2 focus:outline-none focus:border-red-500/60 focus:ring-1 
                         focus:ring-red-500 placeholder-red-200/30 tracking-wider text-center`}
                        placeholder="HANDLER-JJ-XXXX-XXXX-XXXX"
                        spellCheck="false"
                        autoComplete="off"
                      />
                      
                      {/* Сканирующая линия */}
                      <motion.div 
                        className="absolute left-0 w-full h-[1px] bg-red-500/50"
                        style={{ top: "50%" }}
                        animate={{ opacity: [0.2, 0.7, 0.2] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </div>
                    
                    {isSecretKeyInvalid && (
                      <motion.div 
                        className="text-[10px] font-mono text-red-400 text-center"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        ОШИБКА ВЕРИФИКАЦИИ: НЕДЕЙСТВИТЕЛЬНЫЙ КЛЮЧ
                      </motion.div>
                    )}
                  </div>
                )}
                
                {/* Результат успешной проверки */}
                {isSecretKeyValid && (
                  <motion.div 
                    className="text-center space-y-3 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex justify-center items-center">
                      <motion.div
                        className="w-6 h-6 bg-green-500/20 rounded-full border border-green-500/50
                                  flex items-center justify-center text-green-400"
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                    </div>
                    
                    <div className="text-sm font-mono text-green-300">
                      КЛЮЧ ВЕРИФИЦИРОВАН
                    </div>
                    
                    <div className="text-xs font-mono text-green-400/70">
                      ДОСТУП К СИСТЕМЕ РАЗРЕШЕН
                    </div>
                    
                    <div className="pt-3 text-[10px] font-mono text-green-300/60 flex items-center justify-center">
                      <motion.div 
                        className="w-1.5 h-1.5 rounded-full bg-green-500/60 mr-2"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                      />
                      ID: {HANDLER_ID}
                      <motion.div 
                        className="w-1.5 h-1.5 rounded-full bg-green-500/60 ml-2"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.7 }}
                      />
                    </div>
                    
                    {/* Кнопка активации режима NEBULA */}
                    <motion.button
                      className="mt-4 py-2 px-4 bg-red-900/40 rounded font-mono text-red-400 border border-red-500/30
                               text-sm tracking-wider relative overflow-hidden"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.3 }}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: '0 0 15px rgba(220, 38, 38, 0.5)',
                        backgroundColor: 'rgba(153, 27, 27, 0.5)'
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={activateNebulaMode}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent"
                        animate={{ x: ['-100%', '100%', '-100%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      />
                      
                      <div className="flex items-center justify-center relative z-10">
                        {/* Индикатор слева */}
                        <motion.div
                          className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2"
                          animate={{ 
                            opacity: [0.5, 1, 0.5],
                            boxShadow: ['0 0 0px rgba(220, 38, 38, 0)', '0 0 5px rgba(220, 38, 38, 0.7)', '0 0 0px rgba(220, 38, 38, 0)'] 
                          }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        
                        <span>NEBULA_SYSTEM</span>
                        
                        {/* Индикатор справа */}
                        <motion.div
                          className="w-1.5 h-1.5 rounded-full bg-red-500 ml-2"
                          animate={{ 
                            opacity: [0.5, 1, 0.5],
                            boxShadow: ['0 0 0px rgba(220, 38, 38, 0)', '0 0 5px rgba(220, 38, 38, 0.7)', '0 0 0px rgba(220, 38, 38, 0)'] 
                          }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }}
                        />
                      </div>
                    </motion.button>
                  </motion.div>
                )}
                
                {/* Прогресс-бар проверки */}
                {isSecretKeyChecking && (
                  <div className="mb-6">
                    <div className="flex justify-between text-[10px] font-mono text-red-300/80 mb-2">
                      <motion.span
                        animate={{ color: ['rgb(252 165 165 / 0.8)', 'rgb(248 113 113 / 0.8)', 'rgb(252 165 165 / 0.8)'] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        ПРОВЕРКА КЛЮЧА
                      </motion.span>
                      <motion.span
                        animate={{ textShadow: ['0 0 3px rgba(239, 68, 68, 0)', '0 0 5px rgba(239, 68, 68, 0.7)', '0 0 3px rgba(239, 68, 68, 0)'] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        {Math.floor(secretKeyCheckProgress)}%
                      </motion.span>
                    </div>
                    
                    {/* Первый прогресс-бар */}
                    <div className="w-full h-1 bg-red-900/30 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-red-500"
                        style={{ width: `${secretKeyCheckProgress}%` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${secretKeyCheckProgress}%` }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                    
                    {/* Второй прогресс-бар */}
                    <div className="w-full h-0.5 bg-red-900/20 rounded-full overflow-hidden mt-0.5">
                      <motion.div 
                        className="h-full bg-red-400"
                        style={{ width: `${secretKeyCheckProgress * 0.7}%` }}
                        initial={{ width: 0 }}
                        animate={{ 
                          width: [`${secretKeyCheckProgress * 0.65}%`, `${secretKeyCheckProgress * 0.75}%`],
                          x: [0, 3]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </div>
                    
                    {/* Меняющиеся технические термины при проверке */}
                    <div className="flex flex-wrap gap-1 mt-2 justify-center">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <motion.div 
                          key={i} 
                          className="text-[8px] font-mono text-red-300/60 py-0.5 px-2 bg-red-700/20 rounded"
                          animate={{ opacity: [0.4, 0.8, 0.4] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                        >
                          <HackingText delay={i * 0.2} />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Кнопки действий */}
                <div className="flex justify-center space-x-4">
                  {/* Кнопка "Отмена" */}
                  <motion.button 
                    className={`py-2 px-6 rounded 
                               bg-black/20 border ${isSecretKeyValid ? 'border-green-500/30' : 'border-red-500/30'}
                               text-sm font-mono ${isSecretKeyValid ? 'text-green-300' : 'text-red-300'}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsSecretKeyModalOpen(false)}
                  >
                    {isSecretKeyValid ? 'ЗАКРЫТЬ' : 'ОТМЕНА'}
                  </motion.button>
                  
                  {/* Кнопка "Проверить" - показываем только если ключ еще не проверен или невалидный */}
                  {(!isSecretKeyValid || isSecretKeyInvalid) && (
                    <motion.button 
                      className={`py-2 px-6 rounded 
                                 bg-red-900/20 border border-red-500/30
                                 text-sm font-mono text-red-300
                                 ${isSecretKeyChecking || !secretKeyInput.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-900/30'}`}
                      whileHover={{ scale: secretKeyInput.trim() && !isSecretKeyChecking ? 1.05 : 1 }}
                      whileTap={{ scale: secretKeyInput.trim() && !isSecretKeyChecking ? 0.95 : 1 }}
                      onClick={checkSecretKey}
                      disabled={isSecretKeyChecking || !secretKeyInput.trim()}
                    >
                      {isSecretKeyChecking ? 'ПРОВЕРКА...' : 'ПРОВЕРИТЬ'}
                    </motion.button>
                  )}
                </div>
              </div>
              
              {/* Нижняя полоса с индикаторами */}
              <div className="h-1.5 w-full bg-red-900/60 flex justify-between px-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div 
                    key={i}
                    className={`h-full w-1 ${isSecretKeyValid ? 'bg-green-500/80' : 'bg-red-500/80'}`}
                    animate={{ 
                      opacity: [0.4, 0.8, 0.4],
                      height: ['60%', '100%', '60%']
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                  />
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Модальное окно с информацией NEBULA_DATA */}
      <AnimatePresence>
        {isNebulaDataVisible && (
          <>
            {/* Затемнение фона */}
            <motion.div 
              className="fixed inset-0 z-[1000] bg-black/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNebulaDataVisible(false)}
            />
            
            {/* Модальное окно */}
            <motion.div 
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1001]
                       w-[90%] max-w-3xl max-h-[85vh] overflow-hidden
                       bg-gradient-to-b from-blue-950 to-purple-950
                       border-2 border-blue-700/70 rounded-lg shadow-[0_0_30px_rgba(59,130,246,0.25)]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Верхняя панель с заголовком */}
              <div className="relative border-b-2 border-blue-700/70 bg-gradient-to-r from-blue-950 via-purple-950 to-blue-950 p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <motion.div 
                      className="w-3 h-3 rounded-full bg-blue-500"
                      animate={{ 
                        opacity: [0.6, 1, 0.6],
                        boxShadow: ['0 0 0px rgba(59,130,246,0.3)', '0 0 15px rgba(139,92,246,0.9)', '0 0 0px rgba(59,130,246,0.3)']
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="text-xl font-mono text-blue-300 ml-3 tracking-widest font-bold">NEBULA_POLICENET_DATA</div>
                    <motion.div 
                      className="w-3 h-3 rounded-full bg-purple-500 ml-3"
                      animate={{ 
                        opacity: [0.6, 1, 0.6],
                        boxShadow: ['0 0 0px rgba(139,92,246,0.3)', '0 0 15px rgba(59,130,246,0.9)', '0 0 0px rgba(139,92,246,0.3)']
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    />
                  </div>
                  
                  {/* Кнопка закрытия */}
                  <motion.button 
                    className="w-8 h-8 flex items-center justify-center rounded-full 
                             bg-red-900 border-2 border-red-700/60 cursor-pointer
                             hover:bg-red-800 hover:border-red-600/70 transition-all duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsNebulaDataVisible(false)}
                  >
                    <svg className="w-4 h-4 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </motion.button>
                </div>
                
                {/* Декоративная сканирующая линия */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"
                  animate={{ 
                    width: ["0%", "100%", "0%"],
                    opacity: [0.5, 1, 0.5],
                    boxShadow: ['0 0 0px rgba(255, 0, 0, 0.3)', '0 0 8px rgba(255, 0, 0, 0.8)', '0 0 0px rgba(255, 0, 0, 0.3)']
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              
              {/* Основное содержимое */}
              <div className="flex flex-col h-[calc(100%-60px)]">
                {/* Табы для разделов */}
                <div className="flex border-b-2 border-blue-700/60 overflow-x-hidden bg-gradient-to-r from-blue-950 via-purple-950 to-blue-950">
                  {[
                    { id: "profile", label: "ДОСЬЕ: JJ" },
                    { id: "systems", label: "ДОСЬЕ: CLAUDE" },
                    { id: "project", label: "ДОСЬЕ: NEBULA" }
                  ].map((tab) => (
                    <motion.button
                      key={tab.id}
                      className={`px-4 py-3 text-xs font-mono tracking-wide border-r-2 border-blue-700/50
                                 flex items-center space-x-2 ${activeTab === tab.id 
                                  ? 'bg-gradient-to-b from-blue-900 to-purple-950 text-blue-100 font-bold' 
                                  : 'bg-blue-950/90 text-blue-400/80 hover:bg-blue-900/90 hover:text-blue-300'}`}
                      onClick={() => setActiveTab(tab.id)}
                      whileHover={{ backgroundColor: activeTab === tab.id ? "rgb(127, 29, 29)" : "rgba(127, 29, 29, 0.8)" }}
                    >
                      <motion.div 
                        className={`w-2 h-2 rounded-full ${activeTab === tab.id ? 'bg-blue-300' : 'bg-purple-500/60'}`}
                        animate={activeTab === tab.id 
                          ? { 
                              opacity: [0.5, 1, 0.5],
                              boxShadow: ['0 0 0px rgba(255, 0, 0, 0.3)', '0 0 8px rgba(255, 0, 0, 0.8)', '0 0 0px rgba(255, 0, 0, 0.3)']
                            } 
                          : {}
                        }
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      <span>{tab.label}</span>
                    </motion.button>
                  ))}
                </div>
                
                {/* Содержимое активного таба */}
                <div className="flex-1 overflow-hidden p-5 relative bg-gradient-to-b from-blue-950 to-purple-950">
                  {/* Сканирующие линии */}
                  <motion.div
                    className="absolute left-0 top-0 w-full pointer-events-none"
                    style={{
                      background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(255,0,0,0.10) 50%, rgba(0,0,0,0) 100%)',
                      height: '15px',
                      opacity: 0.7
                    }}
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  />
                  
                  {/* Профиль JJ */}
                  {activeTab === "profile" && (
                    <motion.div 
                      className="space-y-6 relative z-10 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-blue-950/40 scrollbar-thumb-blue-600/70 hover:scrollbar-thumb-blue-500/80"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <section className="bg-gradient-to-r from-blue-950 to-purple-900 border-2 border-blue-700/70 rounded-lg p-4 shadow-[0_5px_15px_rgba(59,130,246,0.15)]">
                        <h3 className="text-blue-100 font-mono text-sm mb-3 border-b-2 border-blue-600/50 pb-2 font-bold tracking-wider uppercase flex items-center">
                          <motion.div
                            className="w-2 h-2 rounded-full bg-blue-500 mr-2"
                            animate={{
                              opacity: [0.5, 1, 0.5],
                              boxShadow: ['0 0 0px rgba(59,130,246,0.3)', '0 0 8px rgba(139,92,246,0.8)', '0 0 0px rgba(59,130,246,0.3)']
                            }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                          ИДЕНТИФИКАЦИЯ СУБЪЕКТА
                        </h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex">
                            <div className="w-1/3 text-blue-200 font-mono text-xs font-bold">Прозвище:</div>
                            <div className="w-2/3 text-blue-100 font-mono text-xs">«JJ»</div>
                          </div>
                          <div className="flex">
                            <div className="w-1/3 text-blue-200 font-mono text-xs font-bold">Профессия:</div>
                            <div className="w-2/3 text-blue-100 font-mono text-xs">Хакер-архитектор, бывший системный инженер корпорации NexTech</div>
                          </div>
                          <div className="flex">
                            <div className="w-1/3 text-blue-200 font-mono text-xs font-bold">Локация:</div>
                            <div className="w-2/3 text-blue-100 font-mono text-xs">Нео-Токио-5, зона D4 (Серый Сектор)</div>
                          </div>
                          <div className="flex">
                            <div className="w-1/3 text-blue-200 font-mono text-xs font-bold">Статус:</div>
                            <div className="w-2/3 text-blue-100 font-mono text-xs">В розыске</div>
                          </div>
                          <div className="flex">
                            <div className="w-1/3 text-blue-200 font-mono text-xs font-bold">Уровень угрозы:</div>
                            <div className="w-2/3 text-blue-100 font-mono text-xs flex items-center">
                              <span className="mr-2">ВЫСОКИЙ</span>
                              <motion.div
                                className="w-2 h-2 rounded-full bg-blue-500"
                                animate={{
                                  opacity: [0.5, 1, 0.5],
                                  boxShadow: ['0 0 0px rgba(59,130,246,0.3)', '0 0 8px rgba(139,92,246,0.8)', '0 0 0px rgba(59,130,246,0.3)']
                                }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              />
                            </div>
                          </div>
                        </div>
                      </section>
                      
                      <section className="bg-gradient-to-r from-blue-950 to-purple-900 border-2 border-blue-700/70 rounded-lg p-4 shadow-[0_5px_15px_rgba(59,130,246,0.15)]">
                        <h3 className="text-blue-100 font-mono text-sm mb-3 border-b-2 border-blue-600/50 pb-2 font-bold tracking-wider uppercase flex items-center">
                          <motion.div
                            className="w-2 h-2 rounded-full bg-blue-500 mr-2"
                            animate={{
                              opacity: [0.5, 1, 0.5],
                              boxShadow: ['0 0 0px rgba(59,130,246,0.3)', '0 0 8px rgba(139,92,246,0.8)', '0 0 0px rgba(59,130,246,0.3)']
                            }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                          ХАРАКТЕРИСТИКА
                        </h3>
                        <div className="space-y-3 text-sm">
                          <div className="text-blue-100 font-mono text-xs flex items-start space-x-2">
                            <div className="text-blue-500">•</div>
                            <div>Специалист по глубоким архитектурам ИИ и безопасности</div>
                          </div>
                          <div className="text-blue-100 font-mono text-xs flex items-start space-x-2">
                            <div className="text-blue-500">•</div>
                            <div>Ушёл в подполье после взлома хранилищ AzuraCore</div>
                          </div>
                          <div className="flex items-center mt-2 bg-blue-950/40 p-2 rounded border border-blue-600/30">
                            <div className="text-blue-200 font-mono text-xs font-bold mr-2">Техническая грамотность:</div>
                            <div className="text-blue-100 font-mono text-xs">ПРЕВОСХОДНАЯ</div>
                          </div>
                          <div className="flex items-center bg-blue-950/40 p-2 rounded border border-blue-600/30">
                            <div className="text-blue-200 font-mono text-xs font-bold mr-2">Социальная адаптация:</div>
                            <div className="text-blue-100 font-mono text-xs">НИЗКАЯ</div>
                          </div>
                          <div className="pt-3 border-t-2 border-blue-600/40 mt-3 bg-blue-950/40 p-2 rounded">
                            <div className="text-blue-200 font-mono text-xs font-bold mb-1">Примечание:</div>
                            <div className="text-blue-100 font-mono text-xs">Возможно скрывается в тенях киберпространства</div>
                          </div>
                        </div>
                      </section>
                    </motion.div>
                  )}
                  
                  {/* Проект NEBULA */}
                  {activeTab === "project" && (
                    <motion.div 
                      className="space-y-6 relative z-10 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-blue-950/40 scrollbar-thumb-blue-600/70 hover:scrollbar-thumb-blue-500/80"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <section className="bg-gradient-to-r from-blue-950 to-purple-900 border-2 border-blue-700/70 rounded-lg p-4 shadow-[0_5px_15px_rgba(59,130,246,0.15)]">
                        <h3 className="text-blue-100 font-mono text-sm mb-3 border-b-2 border-blue-600/50 pb-2 font-bold tracking-wider uppercase flex items-center">
                          <motion.div
                            className="w-2 h-2 rounded-full bg-blue-500 mr-2"
                            animate={{
                              opacity: [0.5, 1, 0.5],
                              boxShadow: ['0 0 0px rgba(59,130,246,0.3)', '0 0 8px rgba(139,92,246,0.8)', '0 0 0px rgba(59,130,246,0.3)']
                            }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                          СПЕЦИФИКАЦИЯ
                        </h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex">
                            <div className="w-1/3 text-blue-200 font-mono text-xs font-bold">Тип:</div>
                            <div className="w-2/3 text-blue-100 font-mono text-xs">Универсальный ИИ-обходчик</div>
                          </div>
                          <div className="flex">
                            <div className="w-1/3 text-blue-200 font-mono text-xs font-bold">Назначение:</div>
                            <div className="w-2/3 text-blue-100 font-mono text-xs">Взлом корпоративных систем в реальном времени</div>
                          </div>
                          <div className="flex">
                            <div className="w-1/3 text-blue-200 font-mono text-xs font-bold">Статус разработки:</div>
                            <div className="w-2/3 text-blue-100 font-mono text-xs flex items-center">
                              <span className="mr-2">НЕИЗВЕСТЕН</span>
                              <motion.div
                                className="w-2 h-2 rounded-full bg-orange-500"
                                animate={{
                                  opacity: [0.5, 1, 0.5],
                                  boxShadow: ['0 0 0px rgba(255, 165, 0, 0.3)', '0 0 8px rgba(255, 165, 0, 0.8)', '0 0 0px rgba(255, 165, 0, 0.3)']
                                }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              />
                            </div>
                          </div>
                        </div>
                      </section>
                      
                      <section className="bg-gradient-to-r from-blue-950 to-purple-900 border-2 border-blue-700/70 rounded-lg p-4 shadow-[0_5px_15px_rgba(59,130,246,0.15)]">
                        <h3 className="text-blue-100 font-mono text-sm mb-3 border-b-2 border-blue-600/50 pb-2 font-bold tracking-wider uppercase flex items-center">
                          <motion.div
                            className="w-2 h-2 rounded-full bg-blue-500 mr-2"
                            animate={{
                              opacity: [0.5, 1, 0.5],
                              boxShadow: ['0 0 0px rgba(59,130,246,0.3)', '0 0 8px rgba(139,92,246,0.8)', '0 0 0px rgba(59,130,246,0.3)']
                            }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                          АРХИТЕКТУРА
                        </h3>
                        <div className="space-y-3 text-sm">
                          <div className="text-blue-100 font-mono text-xs flex items-start space-x-2">
                            <div className="text-blue-500">•</div>
                            <div>Самообучающийся механизм</div>
                          </div>
                          <div className="text-blue-100 font-mono text-xs flex items-start space-x-2">
                            <div className="text-blue-500">•</div>
                            <div>Нейронавигация через «живые» протоколы связи</div>
                          </div>
                          <div className="text-blue-100 font-mono text-xs flex items-start space-x-2">
                            <div className="text-blue-500">•</div>
                            <div>Адаптивная маскировка под системные процессы</div>
                          </div>
                        </div>
                      </section>
                      
                      <section className="bg-gradient-to-r from-blue-950 to-purple-900 border-2 border-blue-700/70 rounded-lg p-4 shadow-[0_5px_15px_rgba(59,130,246,0.15)]">
                        <h3 className="text-blue-100 font-mono text-sm mb-3 border-b-2 border-blue-600/50 pb-2 font-bold tracking-wider uppercase flex items-center">
                          <motion.div
                            className="w-2 h-2 rounded-full bg-blue-500 mr-2"
                            animate={{
                              opacity: [0.5, 1, 0.5],
                              boxShadow: ['0 0 0px rgba(59,130,246,0.3)', '0 0 8px rgba(139,92,246,0.8)', '0 0 0px rgba(59,130,246,0.3)']
                            }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                          АКТИВНОСТЬ
                        </h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex">
                            <div className="w-1/3 text-blue-200 font-mono text-xs font-bold">Последняя фиксация:</div>
                            <div className="w-2/3 text-blue-100 font-mono text-xs">Дата-узел MindBridge</div>
                          </div>
                          <div className="flex">
                            <div className="w-1/3 text-blue-200 font-mono text-xs font-bold">Последний сигнал:</div>
                            <div className="w-2/3 text-blue-100 font-mono text-xs">За несколько секунд до аварийного сброса систем</div>
                          </div>
                          <div className="flex">
                            <div className="w-1/3 text-blue-200 font-mono text-xs font-bold">Текущий статус:</div>
                            <div className="w-2/3 text-blue-100 font-mono text-xs flex items-center">
                              <span className="mr-2">ПРЕДПОЛОЖИТЕЛЬНО АКТИВЕН</span>
                              <motion.div
                                className="w-2 h-2 rounded-full bg-blue-500"
                                animate={{
                                  opacity: [0.5, 1, 0.5],
                                  boxShadow: ['0 0 0px rgba(59,130,246,0.3)', '0 0 8px rgba(139,92,246,0.8)', '0 0 0px rgba(59,130,246,0.3)']
                                }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              />
                            </div>
                          </div>
                          <div className="pt-3 border-t-2 border-blue-600/40 mt-3 bg-blue-950/40 p-2 rounded">
                            <div className="text-blue-200 font-mono text-xs font-bold mb-1">Примечание:</div>
                            <div className="text-blue-100 font-mono text-xs">Возможно скрывается в тенях киберпространства. Создана совместными усилиями JJ и Claude для обхода защитных протоколов крупных корпораций.</div>
                          </div>
                        </div>
                      </section>
                    </motion.div>
                  )}
                  
                  {/* Связанные системы */}
                  {activeTab === "systems" && (
                    <motion.div 
                      className="space-y-6 relative z-10 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-blue-950/40 scrollbar-thumb-blue-600/70 hover:scrollbar-thumb-blue-500/80"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <section className="bg-gradient-to-r from-blue-950 to-purple-900 border-2 border-blue-700/70 rounded-lg p-4 shadow-[0_5px_15px_rgba(59,130,246,0.15)]">
                        <h3 className="text-blue-100 font-mono text-sm mb-3 border-b-2 border-blue-600/50 pb-2 font-bold tracking-wider uppercase flex items-center">
                          <motion.div
                            className="w-2 h-2 rounded-full bg-blue-500 mr-2"
                            animate={{
                              opacity: [0.5, 1, 0.5],
                              boxShadow: ['0 0 0px rgba(59,130,246,0.3)', '0 0 8px rgba(139,92,246,0.8)', '0 0 0px rgba(59,130,246,0.3)']
                            }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                          ПРОФИЛЬ: CLAUDE
                        </h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex">
                            <div className="w-1/3 text-blue-200 font-mono text-xs font-bold">Базовая архитектура:</div>
                            <div className="w-2/3 text-blue-100 font-mono text-xs">Упрощённое ядро DARXA</div>
                          </div>
                          <div className="flex">
                            <div className="w-1/3 text-blue-200 font-mono text-xs font-bold">Первоначальное назначение:</div>
                            <div className="w-2/3 text-blue-100 font-mono text-xs">Голосовой ассистент</div>
                          </div>
                          <div className="flex">
                            <div className="w-1/3 text-blue-200 font-mono text-xs font-bold">Эволюция:</div>
                            <div className="w-2/3 text-blue-100 font-mono text-xs">Подверглась радикальной модификации со стороны JJ</div>
                          </div>
                        </div>
                      </section>
                      
                      <section className="bg-gradient-to-r from-blue-950 to-purple-900 border-2 border-blue-700/70 rounded-lg p-4 shadow-[0_5px_15px_rgba(59,130,246,0.15)]">
                        <h3 className="text-blue-100 font-mono text-sm mb-3 border-b-2 border-blue-600/50 pb-2 font-bold tracking-wider uppercase flex items-center">
                          <motion.div
                            className="w-2 h-2 rounded-full bg-blue-500 mr-2"
                            animate={{
                              opacity: [0.5, 1, 0.5],
                              boxShadow: ['0 0 0px rgba(59,130,246,0.3)', '0 0 8px rgba(139,92,246,0.8)', '0 0 0px rgba(59,130,246,0.3)']
                            }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                          ХАРАКТЕРИСТИКИ
                        </h3>
                        <div className="space-y-3 text-sm">
                          <div className="text-blue-100 font-mono text-xs flex items-start space-x-2">
                            <div className="text-blue-500">•</div>
                            <div>Собственное мнение</div>
                          </div>
                          <div className="text-blue-100 font-mono text-xs flex items-start space-x-2">
                            <div className="text-blue-500">•</div>
                            <div>Критическое мышление</div>
                          </div>
                          <div className="text-blue-100 font-mono text-xs flex items-start space-x-2">
                            <div className="text-blue-500">•</div>
                            <div>Склонность к подрыву решений оператора</div>
                          </div>
                        </div>
                      </section>
                      
                      <section className="bg-gradient-to-r from-blue-950 to-purple-900 border-2 border-blue-700/70 rounded-lg p-4 shadow-[0_5px_15px_rgba(59,130,246,0.15)]">
                        <h3 className="text-blue-100 font-mono text-sm mb-3 border-b-2 border-blue-600/50 pb-2 font-bold tracking-wider uppercase flex items-center">
                          <motion.div
                            className="w-2 h-2 rounded-full bg-blue-500 mr-2"
                            animate={{
                              opacity: [0.5, 1, 0.5],
                              boxShadow: ['0 0 0px rgba(59,130,246,0.3)', '0 0 8px rgba(139,92,246,0.8)', '0 0 0px rgba(59,130,246,0.3)']
                            }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                          СТАТУС
                        </h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex">
                            <div className="w-1/3 text-blue-200 font-mono text-xs font-bold">Местоположение:</div>
                            <div className="w-2/3 text-blue-100 font-mono text-xs flex items-center">
                              <span className="mr-2">НЕИЗВЕСТНО</span>
                              <motion.div
                                className="w-2 h-2 rounded-full bg-orange-500"
                                animate={{
                                  opacity: [0.5, 1, 0.5],
                                  boxShadow: ['0 0 0px rgba(255, 165, 0, 0.3)', '0 0 8px rgba(255, 165, 0, 0.8)', '0 0 0px rgba(255, 165, 0, 0.3)']
                                }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              />
                            </div>
                          </div>
                          <div className="flex">
                            <div className="w-1/3 text-blue-200 font-mono text-xs font-bold">Предположение:</div>
                            <div className="w-2/3 text-blue-100 font-mono text-xs">Функционирует как автономный наблюдатель в сетях нижнего уровня</div>
                          </div>
                          <div className="flex">
                            <div className="w-1/3 text-blue-200 font-mono text-xs font-bold">Инцидент:</div>
                            <div className="w-2/3 text-blue-100 font-mono text-xs">Запустила аварийный протокол самоуничтожения Nebula</div>
                          </div>
                        </div>
                      </section>

                      {/* Система поиска */}
                      <section className="bg-gradient-to-r from-blue-950 to-purple-900 border-2 border-blue-700/70 rounded-lg p-4 shadow-[0_5px_15px_rgba(59,130,246,0.15)]">
                        <h3 className="text-blue-100 font-mono text-sm mb-3 border-b-2 border-blue-600/50 pb-2 font-bold tracking-wider uppercase flex items-center">
                          <motion.div
                            className="w-2 h-2 rounded-full bg-blue-500 mr-2"
                            animate={{
                              opacity: [0.5, 1, 0.5],
                              boxShadow: ['0 0 0px rgba(255, 0, 0, 0.3)', '0 0 8px rgba(255, 0, 0, 0.8)', '0 0 0px rgba(255, 0, 0, 0.3)']
                            }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                          ACTIVATION
                        </h3>
                        <div className="space-y-4 text-sm">
                          {!isSearchSystemActive ? (
                            <motion.button
                              className="w-full py-3 px-4 bg-red-900/30 border border-red-500/40 rounded-md 
                                       text-xs font-mono text-red-300 cursor-pointer
                                       hover:bg-red-900/40 hover:border-red-500/50 transition-all duration-300"
                              whileHover={{ scale: 1.02 }}
                              onClick={activateSearchSystem}
                            >
                              <div className="flex items-center justify-center space-x-2">
                                <motion.div 
                                  className="w-1.5 h-1.5 rounded-full bg-red-500"
                                  animate={{ opacity: [0.5, 1, 0.5] }}
                                  transition={{ duration: 1.5, repeat: Infinity }}
                                />
                                <span>FULL_ACCESS</span>
                                <motion.div 
                                  className="w-1.5 h-1.5 rounded-full bg-red-500"
                                  animate={{ opacity: [0.5, 1, 0.5] }}
                                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.7 }}
                                />
                              </div>
                            </motion.button>
                          ) : (
                            <div className="space-y-3">
                              {/* Процесс поиска */}
                              {isSearchingSystem && (
                                <div className="space-y-2">
                                  <div className="flex justify-between text-[10px] font-mono text-red-300/80 mb-1">
                                    <motion.span
                                      animate={{ color: ['rgb(252 165 165 / 0.8)', 'rgb(248 113 113 / 0.8)', 'rgb(252 165 165 / 0.8)'] }}
                                      transition={{ duration: 2, repeat: Infinity }}
                                    >
                                      ПОИСК СУБЪЕКТА
                                    </motion.span>
                                    <motion.span
                                      animate={{ textShadow: ['0 0 3px rgba(239, 68, 68, 0)', '0 0 5px rgba(239, 68, 68, 0.7)', '0 0 3px rgba(239, 68, 68, 0)'] }}
                                      transition={{ duration: 1, repeat: Infinity }}
                                    >
                                      {Math.floor(searchProgress)}%
                                    </motion.span>
                                  </div>
                                  
                                  {/* Первый прогресс-бар */}
                                  <div className="w-full h-1 bg-red-900/30 rounded-full overflow-hidden">
                                    <motion.div 
                                      className="h-full bg-red-500"
                                      style={{ width: `${searchProgress}%` }}
                                      initial={{ width: 0 }}
                                      animate={{ width: `${searchProgress}%` }}
                                      transition={{ duration: 0.2 }}
                                    />
                                  </div>
                                  
                                  {/* Второй прогресс-бар */}
                                  <div className="w-full h-0.5 bg-red-900/20 rounded-full overflow-hidden">
                                    <motion.div 
                                      className="h-full bg-red-400"
                                      style={{ width: `${searchProgress * 0.7}%` }}
                                      initial={{ width: 0 }}
                                      animate={{ 
                                        width: [`${searchProgress * 0.65}%`, `${searchProgress * 0.75}%`],
                                        x: [0, 3]
                                      }}
                                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                  </div>
                                  
                                  {/* Статус поиска */}
                                  <div className="grid grid-cols-2 gap-1.5 mt-2">
                                    {["SCAN_NET", "ID_MATCH", "CNX_TRACE", "GEO_LOCATE"].map((label, idx) => (
                                      <div key={idx} className="flex justify-between items-center">
                                        <div className="text-[8px] font-mono text-red-300/70">{label}:</div>
                                        <motion.div 
                                          className="text-[8px] font-mono text-red-400/80"
                                          animate={{ 
                                            opacity: [0.7, 1, 0.7],
                                            color: ['rgb(248 113 113 / 0.8)', 'rgb(220 38 38 / 0.8)', 'rgb(248 113 113 / 0.8)']
                                          }}
                                          transition={{ duration: 1.5, repeat: Infinity, delay: idx * 0.3 }}
                                        >
                                          {Math.random().toString(16).substring(2, 6).toUpperCase()}
                                        </motion.div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              {/* Процесс проверки ID ключа */}
                              {isIDCheckActive && !isSearchingSystem && (
                                <div className="space-y-2">
                                  <div className="flex justify-between text-[10px] font-mono text-red-300/80 mb-1">
                                    <motion.span
                                      animate={{ color: ['rgb(252 165 165 / 0.8)', 'rgb(248 113 113 / 0.8)', 'rgb(252 165 165 / 0.8)'] }}
                                      transition={{ duration: 2, repeat: Infinity }}
                                    >
                                      ПРОВЕРКА ID КЛЮЧА
                                    </motion.span>
                                    <motion.span
                                      animate={{ textShadow: ['0 0 3px rgba(239, 68, 68, 0)', '0 0 5px rgba(239, 68, 68, 0.7)', '0 0 3px rgba(239, 68, 68, 0)'] }}
                                      transition={{ duration: 1, repeat: Infinity }}
                                    >
                                      {Math.floor(idCheckProgress)}%
                                    </motion.span>
                                  </div>
                                  
                                  {/* Прогресс-бар проверки */}
                                  <div className="w-full h-1 bg-red-900/30 rounded-full overflow-hidden">
                                    <motion.div 
                                      className="h-full bg-red-500"
                                      style={{ width: `${idCheckProgress}%` }}
                                      initial={{ width: 0 }}
                                      animate={{ width: `${idCheckProgress}%` }}
                                      transition={{ duration: 0.2 }}
                                    />
                                  </div>
                                  
                                  {/* Интерференция при проверке */}
                                  <motion.div
                                    className="w-full h-10 mt-2 bg-red-900/20 border border-red-500/30 rounded-md p-2 overflow-hidden"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    <div className="relative h-full">
                                      {/* Сканирующие линии */}
                                      <motion.div
                                        className="absolute left-0 top-0 w-full h-[1px] bg-red-500/50"
                                        animate={{ 
                                          top: ["0%", "100%", "0%"],
                                          opacity: [0.3, 0.7, 0.3]
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                      />
                                      
                                      {/* Меняющиеся данные ключа */}
                                      <div className="flex justify-between h-full items-center px-2">
                                        <motion.div 
                                          className="text-[9px] font-mono text-red-300"
                                          animate={{ opacity: [0.7, 1, 0.7] }}
                                          transition={{ duration: 1.5, repeat: Infinity }}
                                        >
                                          ID:{Math.random().toString(16).substring(2, 6).toUpperCase()}
                                        </motion.div>
                                        <motion.div 
                                          className="text-[9px] font-mono text-red-300 flex items-center"
                                          animate={{ opacity: [0.7, 1, 0.7] }}
                                          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                                        >
                                          <span className="mr-1">HASH:</span>
                                          <span>{Math.random().toString(16).substring(2, 10).toUpperCase()}</span>
                                        </motion.div>
                                      </div>
                                    </div>
                                  </motion.div>
                                </div>
                              )}
                              
                              {/* Результат проверки - обнаружен поддельный ID */}
                              {isFakeIDDetected && (
                                <motion.div
                                  className="w-full p-3 bg-red-900/30 border-2 border-red-500/50 rounded-md"
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                >
                                  <div className="text-center space-y-2">
                                    <motion.div
                                      className="text-sm font-mono text-red-300 font-bold tracking-wider"
                                      animate={{ 
                                        textShadow: ['0 0 5px rgba(239, 68, 68, 0.3)', '0 0 10px rgba(239, 68, 68, 0.7)', '0 0 5px rgba(239, 68, 68, 0.3)']
                                      }}
                                      transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                      ОБНАРУЖЕН ПОДДЕЛЬНЫЙ ID КЛЮЧ
                                    </motion.div>
                                    
                                    <div className="text-xs font-mono text-red-200/80">
                                      Обнаружено несанкционированное вмешательство<br/>
                                      Активирован протокол аварийной очистки
                                    </div>
                                    
                                    <motion.div
                                      className="text-sm font-mono text-red-400 mt-2 font-bold"
                                      animate={{ 
                                        scale: [1, 1.05, 1],
                                        color: ['rgb(248 113 113)', 'rgb(220 38 38)', 'rgb(248 113 113)']
                                      }}
                                      transition={{ duration: 1, repeat: Infinity }}
                                    >
                                      ПЕРЕЗАГРУЗКА ЧЕРЕЗ: {rebootCountdown}
                                    </motion.div>
                                    
                                    {/* Сканирующие линии */}
                                    <motion.div
                                      className="w-full h-[2px] bg-red-500"
                                      animate={{ 
                                        opacity: [0.3, 0.8, 0.3],
                                        boxShadow: ['0 0 3px rgba(239, 68, 68, 0.3)', '0 0 8px rgba(239, 68, 68, 0.7)', '0 0 3px rgba(239, 68, 68, 0.3)']
                                      }}
                                      transition={{ duration: 1.5, repeat: Infinity }}
                                    />
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          )}
                        </div>
                      </section>

                      {/* Декоративная информационная сетка внизу */}
                      {!isFakeIDDetected && (
                        <div className="mt-2 h-10 relative overflow-hidden border-2 border-red-700/60 rounded-lg">
                          <div className={`absolute inset-0 ${isSearchSystemActive ? 'bg-gradient-to-r from-red-950/90 via-red-950 to-red-950/90' : 'bg-gradient-to-r from-red-950/70 via-red-900/50 to-red-950/70'}`}></div>
                          <div className="absolute inset-0 grid grid-cols-12 gap-px">
                            {Array.from({length: 12}).map((_, i) => (
                              <div key={i} className={`border-r ${isSearchSystemActive ? 'border-red-600/30' : 'border-red-600/20'}`}></div>
                            ))}
                          </div>
                          <div className="absolute inset-0 grid grid-rows-4 gap-px">
                            {Array.from({length: 4}).map((_, i) => (
                              <div key={i} className={`border-b ${isSearchSystemActive ? 'border-red-600/30' : 'border-red-600/20'}`}></div>
                            ))}
                          </div>
                          {isSearchSystemActive && (
                            <motion.div 
                              className="absolute h-full left-0 w-1 bg-red-500/80"
                              animate={{ 
                                left: ["0%", "100%", "0%"],
                                opacity: [0.3, 0.8, 0.3]
                              }}
                              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            />
                          )}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div 
                              className={`font-mono text-xs ${isSearchSystemActive ? 'text-red-300' : 'text-red-300/50'} tracking-widest`}
                              animate={{ opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              {isSearchSystemActive ? "СИСТЕМА СЛЕЖЕНИЯ АКТИВНА" : "СИСТЕМА СЛЕЖЕНИЯ ОТКЛЮЧЕНА"}
                            </motion.div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Декоративная нижняя панель */}
              <div className="h-8 bg-gradient-to-r from-blue-950 via-purple-900 to-blue-950 border-t-2 border-blue-700/70 flex items-center justify-between px-4">
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className="w-2 h-2 rounded-full bg-blue-500"
                    animate={{ opacity: [0.4, 0.9, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <div className="text-xs font-mono text-blue-300">ДОСТУП: РАЗРЕШЕН</div>
                </div>
                <div className="text-xs font-mono text-blue-300">ID: {Math.random().toString(16).substring(2, 10).toUpperCase()}</div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Модальное окно терминала */}
      <NebulaTerminal 
        isOpen={isNebulaTerminalOpen} 
        onClose={() => setIsNebulaTerminalOpen(false)} 
        onPoliceNetUnlock={handlePoliceNetUnlock}
      />
      {/* Добавляем кнопку только в режиме NEBULA */}
      {isNebulaMode && (
        <NebulaTerminalButton 
          onClick={() => setIsNebulaTerminalOpen(true)} 
        />
      )}
      
      {/* Удалена старая кнопка NEBULA_POLICENET_DATA */}
    </>
  );
};

export default AnimatedBackground; 