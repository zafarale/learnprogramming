CC = gcc
CFLAGS = -Wall -Wextra -g
SRC_DIR = src
BUILD_DIR = target/debug/build
ASM_DIR = $(BUILD_DIR)/asm
PREPROC_DIR = $(BUILD_DIR)/preprocessed
LST_DIR = $(BUILD_DIR)/listings

# Find all source files containing main function
MAIN_SRCS := $(shell grep -l "main" $(SRC_DIR)/*.c)
# Generate executable names from main source files
TARGETS := $(MAIN_SRCS:$(SRC_DIR)/%.c=$(BUILD_DIR)/%)

# Get all .c files from src directory
SRCS = $(wildcard $(SRC_DIR)/*.c)
# Generate corresponding object file names in build directory
OBJS = $(SRCS:$(SRC_DIR)/%.c=$(BUILD_DIR)/%.o)
# Generate assembly file names
ASM = $(SRCS:$(SRC_DIR)/%.c=$(ASM_DIR)/%.s)
# Generate preprocessed file names
PREPROC = $(SRCS:$(SRC_DIR)/%.c=$(PREPROC_DIR)/%.i)
# Generate listing file names
LISTINGS = $(SRCS:$(SRC_DIR)/%.c=$(LST_DIR)/%.lst)

.PHONY: all clean asm preprocess listings

all: $(BUILD_DIR) $(TARGETS)

# Create all necessary directories
$(BUILD_DIR) $(ASM_DIR) $(PREPROC_DIR) $(LST_DIR):
	mkdir -p $@

# Build each executable
$(BUILD_DIR)/%: $(SRC_DIR)/%.c
	$(CC) $(CFLAGS) $< -o $@

# Generate assembly output
asm: $(ASM_DIR) $(ASM)

$(ASM_DIR)/%.s: $(SRC_DIR)/%.c
	$(CC) $(CFLAGS) -S $< -o $@

# Generate preprocessed output
preprocess: $(PREPROC_DIR) $(PREPROC)

$(PREPROC_DIR)/%.i: $(SRC_DIR)/%.c
	$(CC) $(CFLAGS) -E $< -o $@

# Generate assembly listings with source
listings: $(LST_DIR) $(LISTINGS)

$(LST_DIR)/%.lst: $(SRC_DIR)/%.c
	$(CC) $(CFLAGS) -c -g -Wa,-adhln $< > $@

clean:
	rm -rf $(BUILD_DIR)/*